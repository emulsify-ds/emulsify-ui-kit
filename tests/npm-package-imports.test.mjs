import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import {
  parseJavaScript,
  scanJavaScriptImports,
  scanSassImports,
} from './npm-package-imports.mjs';

test('Sass package scans resolve local styles and ignore plain CSS imports', () => {
  const root = join(
    import.meta.dirname,
    'fixtures/npm-packages/sass-resolution',
  );
  const file = 'styles.scss';
  const imports = scanSassImports(
    readFileSync(join(root, file), 'utf8'),
    file,
    { root },
  );
  assert.deepEqual(
    imports.map(({ specifier, type, name }) => [specifier, type, name ?? null]),
    [
      ['container/container', 'local', null],
      ['literal.sass', 'local', null],
      ['collection', 'local', null],
      ['plain.css', 'local', null],
      ['sass:map', 'local', null],
      ['pkg:swiper/css', 'package', 'swiper'],
      ['pkg:@vendor/styles/theme', 'package', '@vendor/styles'],
      ['blocks/*', 'local', null],
      ['legacy', 'local', null],
      ['another-package', 'package', 'another-package'],
      ['theme-package', 'package', 'theme-package'],
    ],
  );
});

test('JavaScript package scans handle subpaths, built-ins, aliases and dynamic imports', () => {
  const file = 'src/components/slider/slider.js';
  const program = parseJavaScript(
    `
    import fs from 'fs/promises';
    import { createRequire as createLoader } from 'node:module';
    import '@assets/logo.svg';
    import './layout.js';
    export * from '@vendor/tool/runtime';
    const load = createLoader(import.meta.url);
    load('swiper/bundle');
    import(variable);
    require('../../../node_modules/twig/twig.js');
  `,
    file,
  );
  assert.deepEqual(
    scanJavaScriptImports(program, file).map(({ type, name }) => [
      type,
      name ?? null,
    ]),
    [
      ['builtin', 'fs/promises'],
      ['builtin', 'module'],
      ['local', null],
      ['local', null],
      ['package', '@vendor/tool'],
      ['package', 'swiper'],
      ['nonliteral', null],
      ['forbidden-path', null],
    ],
  );
});
