import { basename, join } from 'node:path/posix';
import semver from 'semver';

const packageName = /^(?:@[a-z0-9][a-z0-9._~-]*\/)?[a-z0-9][a-z0-9._~-]*$/u;
const tokenScript = 'src/tokens/build-tokens.mjs';
const tokenPackages = new Set([
  'style-dictionary',
  '@tokens-studio/sd-transforms',
]);
const isMapping = (value) =>
  value !== null && typeof value === 'object' && !Array.isArray(value);
const isInside = (file, directory) => file.startsWith(`${directory}/`);
const mappings = (value) =>
  Array.isArray(value) ? value.filter(isMapping) : [];

export function getComponentEntries(variant) {
  const structures = new Map(
    mappings(variant.structureImplementations)
      .filter(({ directory }) => typeof directory === 'string')
      .map(({ name, directory }) => [name, directory]),
  );
  return mappings(variant.components).map((entry) => ({
    entry,
    directory:
      typeof entry.name === 'string' && structures.has(entry.structure)
        ? join(structures.get(entry.structure), entry.name)
        : null,
    packages: isMapping(entry.npmDependencies) ? entry.npmDependencies : {},
  }));
}

function checkDeclarationLocations(manifest, variants, issues) {
  const allowed = new Set(
    variants.flatMap(({ components }) => mappings(components)),
  );
  function visit(value, path) {
    if (!value || typeof value !== 'object') return;
    if (Object.hasOwn(value, 'npmDependencies') && !allowed.has(value)) {
      issues.push(
        `${path}: npmDependencies is allowed only on component entries`,
      );
    }
    for (const [key, child] of Object.entries(value)) {
      visit(child, `${path}.${key}`);
    }
  }
  visit(manifest, 'system.emulsify.json');
}

function mentionsPackage(source, name) {
  const namePattern = RegExp.escape(name);
  return new RegExp(
    `(?<![a-z0-9._~@/-])${namePattern}(?![a-z0-9_~@-]|\\.[a-z0-9_~@-])`,
    'u',
  ).test(source);
}

function checkDeclarations(
  components,
  packageJson,
  packageImports,
  docsUsage,
  issues,
) {
  const declarations = new Map();
  for (const { entry, directory, packages } of components) {
    if (
      Object.hasOwn(entry, 'npmDependencies') &&
      !isMapping(entry.npmDependencies)
    ) {
      issues.push(`${entry.name}: npmDependencies must be an object`);
    }
    for (const [name, range] of Object.entries(packages)) {
      if (name.length > 214 || !packageName.test(name)) {
        issues.push(
          `${entry.name}: invalid npm package name ${JSON.stringify(name)}`,
        );
        continue;
      }
      if (
        typeof range !== 'string' ||
        !range.trim() ||
        !semver.validRange(range)
      ) {
        issues.push(`${entry.name}: invalid semver range for ${name}`);
        continue;
      }

      if (!declarations.has(name)) declarations.set(name, []);
      declarations.get(name).push({ component: entry.name, range });

      if (!directory) continue;
      if (
        !packageImports.some(
          (imported) =>
            imported.name === name && isInside(imported.file, directory),
        )
      ) {
        issues.push(
          `${entry.name}: unused npmDependencies declaration for ${name}`,
        );
      }
      const docsFile = join(directory, `${basename(directory)}.docs.js`);
      if (!mentionsPackage(docsUsage.get(docsFile) ?? '', name)) {
        issues.push(`${docsFile}: name ${name} in the Drupal usage section`);
      }
    }
  }

  for (const [name, requirements] of declarations) {
    let effectiveRange = requirements[0].range;
    let conflict = false;
    for (const [index, { component, range }] of requirements.entries()) {
      for (const previous of requirements.slice(0, index)) {
        if (
          !semver.subset(range, previous.range) &&
          !semver.subset(previous.range, range)
        ) {
          issues.push(
            `${component}: ${name} range ${range} conflicts with ${previous.range} on ${previous.component}`,
          );
          conflict = true;
        }
      }
      if (semver.subset(range, effectiveRange)) effectiveRange = range;
    }
    if (!conflict && packageJson.dependencies?.[name] !== effectiveRange) {
      issues.push(
        `package.json: dependencies must list ${name} with the exact range ${effectiveRange}`,
      );
    }
  }
}

export function checkNpmPackagePolicy(
  manifest,
  packageJson,
  imports,
  { docsUsage = new Map() } = {},
) {
  const issues = [];
  const variants = mappings(manifest?.variants);
  checkDeclarationLocations(manifest, variants, issues);
  const packageImports = imports.filter(({ type }) => type === 'package');
  const components = [];
  for (const variant of variants) {
    const entries = getComponentEntries(variant);
    checkDeclarations(entries, packageJson, packageImports, docsUsage, issues);
    components.push(...entries.filter(({ directory }) => directory));
  }

  const runtimeImporters = new Map();
  for (const { file, kind, type, name, specifier } of imports) {
    if (type === 'local') continue;
    if (type === 'nonliteral') {
      issues.push(
        `${file}: use a literal module path so npm imports can be checked`,
      );
      continue;
    }
    if (type === 'forbidden-path') {
      issues.push(
        `${file}: import a package by name instead of using a node_modules path (${specifier})`,
      );
      continue;
    }
    if (type === 'builtin') {
      if (kind !== 'test' && file !== tokenScript) {
        issues.push(`${file}: Node built-in ${specifier} is unavailable here`);
      }
      continue;
    }

    if (file === tokenScript && tokenPackages.has(name)) continue;
    const storySupport =
      ['story', 'docs', 'test'].includes(kind) &&
      ['src/components', 'src/base', 'src/layout'].some((root) =>
        isInside(file, root),
      );
    if (
      name === '@emulsify/core' &&
      (storySupport || isInside(file, 'src/util'))
    ) {
      continue;
    }

    const owners = components.filter(({ directory }) =>
      isInside(file, directory),
    );
    if (!owners.length || !isInside(file, 'src/components')) {
      issues.push(
        `${file}: npm package ${specifier} is allowed only in an installable component`,
      );
      continue;
    }
    for (const { entry, packages } of owners) {
      if (!Object.hasOwn(packages, name)) {
        issues.push(
          `${file}: declare ${name} in npmDependencies for ${entry.name}`,
        );
      }
    }
    if (kind === 'runtime') {
      // Nested install entries share the source file, so count its closest owner.
      const directory = owners.reduce(
        (closest, owner) =>
          owner.directory.length > closest.length ? owner.directory : closest,
        '',
      );
      if (!runtimeImporters.has(name)) runtimeImporters.set(name, new Set());
      runtimeImporters.get(name).add(directory);
    }
  }

  for (const [name, directories] of runtimeImporters) {
    if (directories.size > 1) {
      issues.push(
        `${name}: runtime imports must stay in one component directory because Emulsify Core can emit shared ES modules (${[...directories].join(', ')})`,
      );
    }
  }
  return issues;
}
