import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path/posix';
import test from 'node:test';
import { checkNpmPackagePolicy } from './npm-package-policy.mjs';

const fixture = JSON.parse(
  readFileSync(
    new URL('./fixtures/npm-packages/policy.json', import.meta.url),
    'utf8',
  ),
);

function setup() {
  const { manifest, packageJson } = structuredClone(fixture);
  const variant = manifest.variants[0];
  const imports = [];
  const docsUsage = new Map();
  const declare = (component, name = 'swiper', range = '^11.2.0') => {
    const entry = variant.components.find(({ name }) => name === component);
    entry.npmDependencies ??= {};
    entry.npmDependencies[name] = range;
    const docsFile = `src/components/${component}/${basename(component)}.docs.js`;
    docsUsage.set(docsFile, `${docsUsage.get(docsFile) ?? ''} Uses ${name}.`);
    return entry;
  };
  return {
    manifest,
    variant,
    packageJson,
    imports,
    docsUsage,
    declare,
    check: () =>
      checkNpmPackagePolicy(manifest, packageJson, imports, { docsUsage }),
  };
}

function componentImport(component, overrides = {}) {
  return {
    file: `src/components/${component}/${basename(component)}.js`,
    kind: 'runtime',
    type: 'package',
    name: 'swiper',
    specifier: 'swiper',
    ...overrides,
  };
}

test('requires the component owning the import to declare the package', () => {
  const { imports, check } = setup();
  imports.push(componentImport('first'));
  assert.deepEqual(check(), [
    'src/components/first/first.js: declare swiper in npmDependencies for first',
  ]);
});

test('accepts a declared runtime import without repeating it on a dependent', () => {
  const { declare, imports, check } = setup();
  declare('first');
  imports.push(componentImport('first'));
  assert.deepEqual(check(), []);
});

test('a component dependency alone cannot authorize a direct package import', () => {
  const { declare, imports, check } = setup();
  declare('first');
  imports.push(
    componentImport('first'),
    componentImport('second', {
      file: 'src/components/second/second.stories.js',
      kind: 'story',
    }),
  );
  assert.match(
    check().join('\n'),
    /declare swiper in npmDependencies for second/,
  );
});

test('matches a scoped subpath and a pkg Sass URL to their declarations', () => {
  const { declare, imports, check } = setup();
  declare('first', '@example/library', '^3.2.0');
  declare('first');
  imports.push(
    componentImport('first', {
      name: '@example/library',
      specifier: '@example/library/feature',
    }),
    componentImport('first', {
      file: 'src/components/first/first.scss',
      specifier: 'pkg:swiper/css',
    }),
  );
  assert.deepEqual(check(), []);
});

test('allows Node built-ins in tests and the token build script', () => {
  const { imports, check } = setup();
  for (const [file, kind, specifier] of [
    ['src/components/first/first.test.js', 'test', 'node:path'],
    ['src/tokens/build-tokens.mjs', 'tokens', 'node:fs'],
  ]) {
    imports.push({ file, kind, type: 'builtin', specifier });
  }
  assert.deepEqual(check(), []);
});

test('rejects Node built-ins in behavior JavaScript in either form', () => {
  const { imports, check } = setup();
  for (const specifier of ['node:fs', 'path']) {
    imports.push(componentImport('first', { type: 'builtin', specifier }));
  }
  assert.equal(check().length, 2);
  assert.match(check().join('\n'), /Node built-in node:fs is unavailable/);
  assert.match(check().join('\n'), /Node built-in path is unavailable/);
});

test('rejects invalid or oversized npm package names', () => {
  const { declare, check } = setup();
  for (const name of ['Uppercase', '@scope/project/css', 'a'.repeat(215)]) {
    declare('first', name);
  }
  assert.equal(check().length, 3);
  assert(check().every((issue) => issue.includes('invalid npm package name')));
});

test('validates the shape of declarations and the type and value of each range', () => {
  const { variant, declare, check } = setup();
  variant.components[1].npmDependencies = [];
  for (const [name, range] of [
    ['swiper', 'git+https://example.com/foo.git'],
    ['empty-range', ''],
    ['numeric-range', 42],
  ]) {
    declare('first', name, range);
  }
  assert.deepEqual(check(), [
    'first: invalid semver range for swiper',
    'first: invalid semver range for empty-range',
    'first: invalid semver range for numeric-range',
    'second: npmDependencies must be an object',
  ]);
});

test('rejects conflicting ranges even when both would accept a third range', () => {
  const { variant, declare, imports, check } = setup();
  variant.components.push({ name: 'third', structure: 'components' });
  for (const [component, range] of [
    ['first', '11.2.0'],
    ['second', '>=10 <12'],
    ['third', '>=11 <13'],
  ]) {
    declare(component, 'swiper', range);
    imports.push(
      componentImport(component, {
        file: `src/components/${component}/${component}.stories.js`,
        kind: 'story',
      }),
    );
  }
  assert.deepEqual(check(), [
    'third: swiper range >=11 <13 conflicts with >=10 <12 on second',
  ]);
});

test('accepts compatible subset ranges using their narrower exact dependency range', () => {
  const { declare, imports, check } = setup();
  declare('first', 'swiper', '>=11 <13');
  declare('second');
  for (const component of ['first', 'second']) {
    imports.push(
      componentImport(component, {
        file: `src/components/${component}/${component}.test.js`,
        kind: 'test',
      }),
    );
  }
  assert.deepEqual(check(), []);
});

test('requires the exact range in dependencies even when an equivalent range is present', () => {
  const { declare, imports, packageJson, check } = setup();
  declare('first');
  imports.push(componentImport('first'));
  packageJson.dependencies.swiper = '>=11.2.0 <12.0.0-0';
  assert.deepEqual(check(), [
    'package.json: dependencies must list swiper with the exact range ^11.2.0',
  ]);
  delete packageJson.dependencies.swiper;
  packageJson.devDependencies = { swiper: '^11.2.0' };
  assert.equal(check().length, 1);
});

test('rejects a stale declaration when only another component imports the package', () => {
  const { declare, imports, check } = setup();
  declare('first');
  declare('second');
  imports.push(componentImport('second'));
  assert.deepEqual(check(), [
    'first: unused npmDependencies declaration for swiper',
  ]);
});

test('restricts packages in shared files to the allowed tooling imports', () => {
  const { imports, check } = setup();
  for (const file of [
    'src/base/base.js',
    'src/layout/grid/grid.scss',
    'src/util/helper.js',
  ]) {
    imports.push(componentImport('first', { file }));
  }
  imports.push(
    {
      file: 'src/base/example.stories.js',
      kind: 'story',
      type: 'package',
      name: '@emulsify/core',
      specifier: '@emulsify/core/storybook',
    },
    {
      file: 'src/util/helper.js',
      kind: 'runtime',
      type: 'package',
      name: '@emulsify/core',
      specifier: '@emulsify/core',
    },
  );
  for (const name of ['style-dictionary', '@tokens-studio/sd-transforms']) {
    imports.push({
      file: 'src/tokens/build-tokens.mjs',
      kind: 'tokens',
      type: 'package',
      name,
      specifier: name,
    });
  }
  assert.equal(check().length, 3);
  assert(
    check().every((issue) =>
      issue.includes('allowed only in an installable component'),
    ),
  );
});

test('rejects package declarations on directories and files', () => {
  const { variant, check } = setup();
  variant.directories[0].npmDependencies = {};
  variant.files[0].npmDependencies = { swiper: '^11.2.0' };
  assert.deepEqual(check(), [
    'system.emulsify.json.variants.0.directories.0: npmDependencies is allowed only on component entries',
    'system.emulsify.json.variants.0.files.0: npmDependencies is allowed only on component entries',
  ]);
});

test('requires the actual package name in the Drupal usage section', () => {
  const { declare, imports, docsUsage, check } = setup();
  declare('first');
  imports.push(componentImport('first'));
  docsUsage.set(
    'src/components/first/first.docs.js',
    'Uses swiper-extra and @another/swiper.',
  );
  assert.deepEqual(check(), [
    'src/components/first/first.docs.js: name swiper in the Drupal usage section',
  ]);
});

test('requires every nested install entry to declare its copied imports', () => {
  const { variant, declare, imports, check } = setup();
  variant.components[1].name = 'first/nested';
  declare('first/nested');
  imports.push(componentImport('first/nested'));
  assert.deepEqual(check(), [
    'src/components/first/nested/nested.js: declare swiper in npmDependencies for first',
  ]);
  declare('first');
  assert.deepEqual(check(), []);
});

test('rejects a second runtime component importing the same package', () => {
  const { declare, imports, check } = setup();
  for (const component of ['first', 'second']) {
    declare(component);
    imports.push(componentImport(component));
  }
  assert.equal(check().length, 1);
  assert.match(
    check()[0],
    /swiper: runtime imports must stay in one component directory/,
  );
});
