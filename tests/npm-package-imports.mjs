import { statSync } from 'node:fs';
import { isBuiltin } from 'node:module';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { parse } from '@babel/parser';
import scss from 'postcss-scss';
import parseValue from 'postcss-value-parser';

export const javascriptPattern = /\.[cm]?[jt]sx?$/;
export const stylesheetPattern = /\.(scss|sass|css)$/;

// Core registers this alias in its Vite css-asset-rebase plugin.
const coreAliases = ['@assets'];

export function* walkJavaScript(node, parent) {
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

export function parseJavaScript(source, file) {
  const plugins = /\.[cm]?tsx?$/.test(file) ? ['typescript'] : [];
  if (!/\.[cm]?ts$/.test(file)) plugins.push('jsx');
  return parse(source, {
    sourceType: 'unambiguous',
    plugins,
    createImportExpressions: true,
  }).program;
}

function stringValue(node) {
  if (node?.type === 'StringLiteral') return node.value;
  if (node?.type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0].value.cooked;
  }
  return null;
}

export function* moduleSources(program) {
  const nodes = [...walkJavaScript(program)].map(([node]) => node);
  const loaders = new Set(['require']);
  const factories = new Set(
    nodes
      .filter(
        (node) =>
          node.type === 'ImportDeclaration' &&
          ['node:module', 'module'].includes(node.source.value),
      )
      .flatMap((node) => node.specifiers)
      .filter((specifier) => specifier.imported?.name === 'createRequire')
      .map((specifier) => specifier.local.name),
  );
  for (const node of nodes) {
    if (
      node.type === 'VariableDeclarator' &&
      node.id.type === 'Identifier' &&
      node.init?.type === 'CallExpression' &&
      factories.has(node.init.callee.name)
    ) {
      loaders.add(node.id.name);
    }
  }
  for (const node of nodes) {
    if (
      node.type === 'ImportDeclaration' ||
      node.type === 'ImportExpression' ||
      node.type === 'ExportAllDeclaration' ||
      (node.type === 'ExportNamedDeclaration' && node.source)
    ) {
      yield stringValue(node.source);
    } else if (
      node.type === 'CallExpression' &&
      (loaders.has(node.callee.name) ||
        (node.callee.object?.name === 'module' &&
          node.callee.property?.name === 'require'))
    ) {
      yield stringValue(node.arguments[0]);
    } else if (node.type === 'TSExternalModuleReference') {
      yield stringValue(node.expression);
    }
  }
}

export function docStrings(program) {
  return [...walkJavaScript(program)].flatMap(([node]) => {
    const text =
      node.type === 'TemplateElement'
        ? node.value.cooked
        : node.type === 'StringLiteral'
          ? node.value
          : null;
    return text ? [{ text, start: node.start }] : [];
  });
}

function fileKind(file) {
  if (file === 'src/tokens/build-tokens.mjs') return 'tokens';
  if (/\.stories\.[^.]+$/.test(file)) return 'story';
  if (/\.docs\.[^.]+$/.test(file)) return 'docs';
  if (/\.(?:test|spec)\.[^.]+$/.test(file)) return 'test';
  return 'runtime';
}

function resolvesLocalSass(url, file, root, directive) {
  const target = resolve(root, dirname(file), url);
  const extension = extname(url);
  const extensions = ['.scss', '.sass', '.css'];
  const candidates = extensions.includes(extension)
    ? [target]
    : [
        ...extensions.map((suffix) => `${target}${suffix}`),
        ...extensions.map((suffix) => join(target, `index${suffix}`)),
      ];
  return candidates.some((candidate) => {
    const paths = [
      candidate,
      join(dirname(candidate), `_${basename(candidate)}`),
    ];
    if (directive === 'import' && /\.s[ac]ss$/.test(candidate)) {
      paths.push(
        ...paths.map((path) => path.replace(/(\.s[ac]ss)$/, '.import$1')),
      );
    }
    return paths.some((path) =>
      statSync(path, { throwIfNoEntry: false })?.isFile(),
    );
  });
}

function classifyImport(
  specifier,
  file,
  { aliases = coreAliases, root, directive } = {},
) {
  const fact = { file, kind: fileKind(file), specifier };
  if (typeof specifier !== 'string' || !specifier.trim()) {
    return { ...fact, type: 'nonliteral' };
  }
  const path = specifier.replaceAll('\\', '/');
  if (/(?:^|[/:])node_modules(?:\/|$)/.test(path)) {
    return { ...fact, type: 'forbidden-path' };
  }
  const explicitPackage = path.startsWith('pkg:');
  if (!explicitPackage && path.startsWith('node:')) {
    return { ...fact, type: 'builtin', name: path.replace(/^node:/, '') };
  }
  if (
    !explicitPackage &&
    (/^(?:\.{1,2}(?:\/|$)|\/(?!\/)|sass:)/.test(path) ||
      aliases.some((alias) => path === alias || path.startsWith(`${alias}/`)) ||
      (directive &&
        (path.includes('*') || resolvesLocalSass(path, file, root, directive))))
  ) {
    return { ...fact, type: 'local' };
  }
  if (!explicitPackage && isBuiltin(path)) {
    return { ...fact, type: 'builtin', name: path };
  }
  const packagePath = path.replace(/^pkg:/, '').split(/[?#]/, 1)[0];
  const name = packagePath
    .split('/', packagePath.startsWith('@') ? 2 : 1)
    .join('/');
  return { ...fact, type: 'package', name };
}

export function scanJavaScriptImports(program, file, options) {
  return [...moduleSources(program)].map((specifier) =>
    classifyImport(specifier, file, options),
  );
}

export function scanSassImports(
  source,
  file,
  { root = process.cwd(), aliases } = {},
) {
  const imports = [];
  scss
    .parse(source, { from: file })
    .walkAtRules(/^(use|forward|import)$/, ({ name, params }) => {
      const nodes = parseValue(params).nodes.filter(
        (node) => !['space', 'comment'].includes(node.type),
      );
      const add = (node) => {
        const specifier =
          node?.type === 'string' && !node.value.includes('#{')
            ? node.value
            : null;
        imports.push(
          classifyImport(specifier, file, { aliases, root, directive: name }),
        );
      };
      if (name !== 'import') {
        add(nodes[0]);
        return;
      }
      let clause = [];
      for (const node of [...nodes, { type: 'div', value: ',' }]) {
        if (node.type === 'div' && node.value === ',') {
          const [first] = clause;
          const plainCss =
            clause.length > 1 ||
            (first?.type === 'function' &&
              first.value.toLowerCase() === 'url') ||
            (first?.type === 'string' &&
              /^(?:https?:)?\/\/|\.css(?:[?#]|$)/i.test(first.value));
          if (!plainCss) add(first);
          clause = [];
        } else {
          clause.push(node);
        }
      }
    });
  return imports;
}
