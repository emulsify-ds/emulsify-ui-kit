import assert from 'node:assert/strict';
import { globSync, readFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import test from 'node:test';
import { parse as parseJavaScript } from '@babel/parser';
import { load as parseYaml } from 'js-yaml';
import scss from 'postcss-scss';
import parseValue from 'postcss-value-parser';

const root = resolve(import.meta.dirname, '..');
const componentRoot = join(root, 'src/components');
const layoutRoot = join(root, 'src/layout');
const schemaSuffix = '.component.yml';
const schemaUrl =
  'https://git.drupalcode.org/project/drupal/-/raw/HEAD/core/assets/schemas/v1/metadata.schema.json';
const docsHeadings = [
  'Overview',
  'Anatomy & composition',
  'Variants',
  'Accessibility',
  'Content guidelines',
  'Drupal usage',
  'Theming',
  'Changes from 1.x',
];
const read = (path) => readFileSync(path, 'utf8');
const readJson = (path) => JSON.parse(read(path));
const { components: allowlist, enforceGlobal } = readJson(
  join(import.meta.dirname, 'contract-allowlist.json'),
);
const legacyProperties = new Set();
scss
  .parse(read(join(root, 'src/base/tokens/legacy-1x.scss')))
  .walkDecls(/^--/, ({ prop }) => {
    legacyProperties.add(prop);
  });

const isMapping = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const isText = (value) => typeof value === 'string' && value.trim() !== '';
const nonemptyArray = (value) => Array.isArray(value) && value.length > 0;
const posixPath = (path) => path.split(sep).join('/');

function* yamlEntries(mapping, path = '', ancestors = new Set()) {
  if (
    mapping === null ||
    typeof mapping !== 'object' ||
    ancestors.has(mapping)
  ) {
    return;
  }
  ancestors.add(mapping);
  for (const [key, value] of Object.entries(mapping)) {
    const entryPath = path ? `${path}.${key}` : key;
    yield { key, path: entryPath };
    yield* yamlEntries(value, entryPath, ancestors);
  }
  ancestors.delete(mapping);
}

function checkSchema(source, issue) {
  let schema;
  try {
    schema = parseYaml(source);
  } catch (error) {
    issue(`invalid YAML (${error.reason ?? error.message})`);
    return [];
  }
  if (!isMapping(schema)) {
    issue('metadata must be a mapping');
    return [];
  }
  if (schema.$schema !== schemaUrl) issue(`set $schema to ${schemaUrl}`);
  for (const field of ['name', 'description', 'group', 'status']) {
    if (!isText(schema[field])) issue(`set ${field}`);
  }

  const props = schema.props?.properties ?? {};
  const slots = schema.slots ?? {};
  if (Object.hasOwn(schema, 'props') && !isMapping(schema.props)) {
    issue('props must be a mapping');
  }
  if (!isMapping(props)) issue('props.properties must be a mapping');
  if (!isMapping(slots)) issue('slots must be a mapping');
  for (const [name, definition] of Object.entries(
    isMapping(props) ? props : {},
  )) {
    const type = definition?.type;
    if (!(isText(type) || (nonemptyArray(type) && type.every(isText)))) {
      issue(`${name} needs a type`);
    }
    for (const field of ['title', 'description']) {
      if (!isText(definition?.[field])) issue(`${name} needs a ${field}`);
    }
    if (
      !/__(?:blockname|modifiers|additional_classes|attributes)$/.test(name) &&
      !nonemptyArray(definition?.examples) &&
      !nonemptyArray(definition?.enum) &&
      !(isMapping(definition) && Object.hasOwn(definition, 'default'))
    ) {
      issue(`${name} needs examples, a default, or an enum`);
    }
    if (Object.hasOwn(slots, name)) issue(`${name} is both a prop and a slot`);
  }
  if (Object.hasOwn(schema.props ?? {}, 'required')) {
    if (!Array.isArray(schema.props.required)) {
      issue('props.required must be an array');
    } else {
      for (const name of schema.props.required) {
        if (!isText(name) || !Object.hasOwn(props, name)) {
          issue(`required entry ${JSON.stringify(name)} is not a defined prop`);
        }
      }
    }
  }
  for (const entry of yamlEntries(schema)) {
    if (entry.key === 'data') issue(`remove the data key at ${entry.path}`);
  }
  return [
    ...Object.keys(isMapping(props) ? props : {}),
    ...Object.keys(isMapping(slots) ? slots : {}),
  ];
}

function checkTwig(source, names, issue) {
  if (names) {
    const comment = /^\s*\{#([\s\S]*?)#\}/.exec(source)?.[1];
    if (!comment) {
      issue('start with a Twig doc comment');
    } else {
      const documented = new Set(comment.match(/[\w-]+/g));
      for (const name of new Set(names)) {
        if (!documented.has(name))
          issue(`document ${name} in the opening comment`);
      }
    }
  }
  const tags = source.matchAll(/\{#[\s\S]*?#\}|\{[{%]([\s\S]*?)[}%]\}/g);
  for (const [, expression] of tags) {
    const code = expression?.replace(
      /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/gs,
      '',
    );
    if (/(?<![\w.])random\s*\(/.test(code ?? '')) {
      issue('use a stable ID instead of random()');
      break;
    }
  }
}

function* walkJavaScript(node, parent) {
  if (!node || typeof node.type !== 'string') return;
  yield [node, parent];
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      for (const child of value) yield* walkJavaScript(child, node);
    } else {
      yield* walkJavaScript(value, node);
    }
  }
}

function parseProgram(source, issue) {
  try {
    return parseJavaScript(source, {
      sourceType: 'unambiguous',
      plugins: ['jsx'],
      createImportExpressions: true,
    }).program;
  } catch (error) {
    issue(`invalid JavaScript (${error.message})`);
    return null;
  }
}

function* moduleSources(program) {
  for (const [node] of walkJavaScript(program)) {
    if (
      node.type === 'ImportDeclaration' ||
      node.type === 'ImportExpression' ||
      node.type === 'ExportAllDeclaration' ||
      (node.type === 'ExportNamedDeclaration' && node.source)
    ) {
      yield node.source?.value;
    } else if (
      node.type === 'CallExpression' &&
      node.callee.name === 'require'
    ) {
      yield node.arguments[0]?.value;
    }
  }
}

function checkStories(program, docsFile, issue) {
  const bindings = new Map();
  const docImports = new Set();
  for (const statement of program.body) {
    const declaration = statement.declaration ?? statement;
    if (declaration.type === 'VariableDeclaration') {
      for (const { id, init } of declaration.declarations) {
        if (id.type === 'Identifier') bindings.set(id.name, init);
      }
    }
    if (
      statement.type === 'ImportDeclaration' &&
      [`./${docsFile}`, `./${docsFile.slice(0, -3)}`].includes(
        statement.source.value,
      )
    ) {
      for (const { local } of statement.specifiers) docImports.add(local.name);
    }
  }

  const resolveBinding = (node, visited = new Set()) => {
    if (node?.type !== 'Identifier' || !bindings.has(node.name)) return node;
    if (visited.has(node.name)) return undefined;
    visited.add(node.name);
    return resolveBinding(bindings.get(node.name), visited);
  };
  const property = (node, name) => {
    const object = resolveBinding(node);
    if (object?.type !== 'ObjectExpression') return undefined;
    return object.properties.findLast(
      ({ type, key, computed }) =>
        type === 'ObjectProperty' &&
        (key.value === name || (!computed && key.name === name)),
    )?.value;
  };
  const usesDocs = (expression, visited = new Set()) => {
    for (const [node, parent] of walkJavaScript(expression)) {
      if (node.type !== 'Identifier') continue;
      if (
        !parent?.computed &&
        ((parent?.key === node && parent.type === 'ObjectProperty') ||
          (parent?.property === node && parent.type === 'MemberExpression'))
      )
        continue;
      if (docImports.has(node.name)) return true;
      if (bindings.has(node.name) && !visited.has(node.name)) {
        visited.add(node.name);
        if (usesDocs(bindings.get(node.name), visited)) return true;
      }
    }
    return false;
  };

  const meta = program.body.find(
    ({ type }) => type === 'ExportDefaultDeclaration',
  )?.declaration;
  const tags = resolveBinding(property(meta, 'tags'));
  if (
    !tags?.elements?.some(
      (element) => resolveBinding(element)?.value === 'autodocs',
    )
  ) {
    issue("include 'autodocs' in the default Storybook tags");
  }
  if (!usesDocs(property(property(meta, 'parameters'), 'docs'))) {
    issue(`source parameters.docs from ${docsFile}`);
  }
  for (const [node] of walkJavaScript(program)) {
    if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
      issue('render the Twig story without JSX');
      break;
    }
  }
}

function checkDocs(program, issue) {
  const strings = [];
  for (const [node] of walkJavaScript(program)) {
    const text =
      node.type === 'TemplateElement'
        ? node.value.cooked
        : node.type === 'StringLiteral'
          ? node.value
          : null;
    if (text) strings.push({ text, start: node.start });
  }
  const headings = strings
    .sort((a, b) => a.start - b.start)
    .flatMap(({ text }) =>
      [...text.matchAll(/^[ \t]*##[ \t]+(.+?)[ \t]*$/gm)].map(
        (match) => match[1],
      ),
    );
  const relevant = headings.filter((heading) => docsHeadings.includes(heading));
  if (relevant.join('\n') !== docsHeadings.join('\n')) {
    issue(
      `include these headings in order: ${docsHeadings.map((heading) => `## ${heading}`).join(', ')}`,
    );
  }
  for (const source of moduleSources(program)) {
    if (typeof source !== 'string') {
      issue('use a literal module path so Twig imports can be checked');
    } else if (/\.twig(?:[?#]|$)/.test(source)) {
      issue(`remove the Twig import ${source}`);
    }
  }
}

function checkBehavior(program, issue) {
  const callsOnce = [...walkJavaScript(program)].some(([node]) => {
    if (node.type !== 'CallExpression') return false;
    const { callee } = node;
    return (
      callee.name === 'once' ||
      (['window', 'globalThis'].includes(callee.object?.name) &&
        callee.property?.name === 'once')
    );
  });
  if (!callsOnce) issue('use once() to initialize behaviors');

  for (const source of moduleSources(program)) {
    if (typeof source !== 'string') {
      issue('use a literal module path so npm imports can be checked');
    } else if (
      !/^(?:\.{1,2}\/|\/(?!\/))/.test(source) ||
      /(?:^|\/)node_modules\//.test(source)
    ) {
      issue(`remove the non-local module import ${source}`);
    }
  }
}

function checkScss(source, file, issue) {
  let sheet;
  try {
    sheet = scss.parse(source, { from: file });
  } catch (error) {
    issue(`invalid SCSS (${error.reason ?? error.message})`);
    return;
  }
  const colors = new Set();
  const tokens = new Set();
  const checkValue = (value) =>
    parseValue(value).walk((node) => {
      if (node.type === 'function' && node.value.toLowerCase() === 'url')
        return false;
      if (node.type !== 'word') return;
      if (/^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(node.value)) {
        colors.add(node.value);
      }
      for (const token of node.value.match(/--[\w-]+/g) ?? []) {
        if (legacyProperties.has(token)) tokens.add(token);
      }
    });
  sheet.walkDecls(({ prop, value }) => {
    if (legacyProperties.has(prop)) tokens.add(prop);
    checkValue(value);
  });
  sheet.walkAtRules(({ params }) => checkValue(params));
  if (colors.size) issue(`replace hex colors: ${[...colors].join(', ')}`);
  if (tokens.size)
    issue(`replace 1.x token properties: ${[...tokens].join(', ')}`);
}

function checkComponent(path, schemas, expectedSchema, componentDirectories) {
  const name = basename(path);
  const issues = [];
  const record = (file) => (message) =>
    issues.push(`${posixPath(file)}: ${message}`);
  const files = globSync(['**/*.js', '**/*.jsx', '**/*.twig', '**/*.scss'], {
    cwd: path,
  })
    .filter((file) => {
      let parent = dirname(file);
      while (parent !== '.') {
        if (componentDirectories.has(join(path, parent))) return false;
        parent = dirname(parent);
      }
      return true;
    })
    .sort();

  const expectedTwig = `${name}.twig`;
  const docs = `${name}.docs.js`;
  const stories = `${name}.stories.js`;
  for (const file of [expectedSchema, expectedTwig, docs, stories]) {
    if (!files.includes(file) && !schemas.includes(file))
      record(file)('missing required file');
  }

  const names = [];
  for (const schema of schemas) {
    if (schema !== expectedSchema)
      record(schema)(`metadata must be named ${expectedSchema}`);
    const declaredNames = checkSchema(read(join(path, schema)), record(schema));
    if (schema === expectedSchema) names.push(...declaredNames);
  }

  for (const file of files) {
    const issue = record(file);
    const source = read(join(path, file));
    if (file.endsWith('.twig')) {
      checkTwig(source, file === expectedTwig ? names : null, issue);
    } else if (file.endsWith('.scss')) {
      checkScss(source, join(path, file), issue);
    } else if (
      file === stories ||
      file === docs ||
      !/\.(?:stories|docs|test|spec)\.js$/.test(file)
    ) {
      const program = parseProgram(source, issue);
      if (!program) continue;
      if (file === stories) checkStories(program, docs, issue);
      else if (file === docs) checkDocs(program, issue);
      else checkBehavior(program, issue);
    }
  }
  return issues;
}

function checkGlobals(schemas, componentDirectories) {
  const issues = [];
  const schemaNames = new Map();
  for (const file of schemas) {
    const name = basename(file);
    const first = schemaNames.get(name);
    if (first)
      issues.push(
        `duplicate metadata basename ${name}: ${posixPath(first)} and ${posixPath(file)}`,
      );
    else schemaNames.set(name, file);
  }

  let manifest;
  try {
    manifest = readJson(join(root, 'system.emulsify.json'));
  } catch (error) {
    issues.push(`cannot read system.emulsify.json (${error.message})`);
    return issues;
  }
  const drupal = Array.isArray(manifest?.variants)
    ? manifest.variants.find((variant) => variant?.platform === 'drupal')
    : undefined;
  if (
    !Array.isArray(drupal?.components) ||
    !Array.isArray(drupal?.structureImplementations)
  ) {
    issues.push(
      'system.emulsify.json requires Drupal components and structure implementations',
    );
    return issues;
  }
  const structures = new Map();
  for (const structure of drupal.structureImplementations) {
    if (!isText(structure?.name) || !isText(structure?.directory)) {
      issues.push(
        'system.emulsify.json has an invalid structure implementation',
      );
      continue;
    }
    structures.set(structure.name, structure.directory);
  }
  const names = new Set();
  const listed = new Set();
  for (const component of drupal.components) {
    const directory = structures.get(component?.structure);
    if (!isText(component?.name) || !isText(directory)) {
      issues.push(
        'system.emulsify.json has a component without a name or valid structure',
      );
      continue;
    }
    const path = relative(
      componentRoot,
      resolve(root, directory, component.name),
    );
    if (names.has(component.name) || listed.has(path)) {
      issues.push(
        `system.emulsify.json lists ${component.name} more than once`,
      );
    }
    names.add(component.name);
    listed.add(path);
    if (!componentDirectories.has(path)) {
      issues.push(
        `system.emulsify.json lists ${posixPath(path)} without a component directory`,
      );
    }
  }
  for (const directory of componentDirectories) {
    if (!listed.has(directory))
      issues.push(`system.emulsify.json omits ${posixPath(directory)}`);
  }
  for (const component of drupal.components) {
    const { name, dependency = [] } = component ?? {};
    if (!Array.isArray(dependency)) {
      issues.push(
        `system.emulsify.json dependencies for ${name} must be an array`,
      );
      continue;
    }
    for (const target of dependency) {
      if (!names.has(target))
        issues.push(
          `system.emulsify.json ${name} depends on missing ${target}`,
        );
    }
  }
  return issues;
}

function report(t, name, issues, enforce) {
  if (!issues.length) return;
  const summary = `${name}: ${issues.length} violation${issues.length === 1 ? '' : 's'}`;
  const details = issues.map((issue) => `  - ${issue}`).join('\n');
  if (enforce) assert.fail(`${summary}\n${details}`);
  t.diagnostic(`WARN ${summary}\n${details}`);
}

const schemas = globSync(`**/*${schemaSuffix}`, { cwd: componentRoot }).sort();
const components = Map.groupBy(schemas, (file) => dirname(file));
const componentDirectories = new Set(components.keys());
const layoutDirectories = globSync('*/', { cwd: layoutRoot }).sort();
const contractDirectories = new Set([
  ...[...componentDirectories].map((directory) =>
    join(componentRoot, directory),
  ),
  ...layoutDirectories.map((directory) => join(layoutRoot, directory)),
]);
const layoutName = (directory) => `layout/${posixPath(directory)}`;

test('contract allowlist entries identify existing component or layout directories', () => {
  assert.ok(Array.isArray(allowlist), 'components must be an array');
  assert.equal(
    typeof enforceGlobal,
    'boolean',
    'enforceGlobal must be a boolean',
  );
  const knownDirectories = new Set([
    ...[...componentDirectories].map(posixPath),
    ...layoutDirectories.map(layoutName),
  ]);
  for (const name of allowlist) {
    assert.ok(
      knownDirectories.has(name),
      `unknown contract directory ${JSON.stringify(name)}`,
    );
  }
});

for (const [directory, files] of components) {
  const name = posixPath(directory);
  test(`component contract: ${name}`, (t) => {
    const issues = checkComponent(
      join(componentRoot, directory),
      files.map((file) => basename(file)),
      `${basename(directory)}${schemaSuffix}`,
      contractDirectories,
    );
    report(t, name, issues, allowlist.includes(name));
  });
}

for (const directory of layoutDirectories) {
  const name = layoutName(directory);
  const path = join(layoutRoot, directory);
  test(`layout contract: ${name}`, (t) => {
    const issues = checkComponent(
      path,
      globSync('*.yml', { cwd: path }).sort(),
      `${directory}.yml`,
      contractDirectories,
    );
    report(t, name, issues, allowlist.includes(name));
  });
}

test('global component contract', (t) => {
  report(
    t,
    'global',
    checkGlobals(schemas, componentDirectories),
    enforceGlobal,
  );
});
