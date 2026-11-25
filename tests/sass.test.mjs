import assert from 'node:assert/strict';
import { join } from 'node:path';
import { describe, it } from 'node:test';
import * as sass from 'sass';
import sassTrue from 'sass-true';

sassTrue.runSass(
  { describe, it, sass },
  join(import.meta.dirname, 'base.test.scss'),
);

const sassOptions = { loadPaths: [join(import.meta.dirname, '../src')] };

describe('Base Sass errors', () => {
  for (const [name, body, error] of [
    [
      'rejects unknown breakpoints',
      "@include base.breakpoint('unknown') { .probe { display: block; } }",
      /Unknown breakpoint "unknown"/,
    ],
    [
      'rejects off-scale spacing',
      '$value: base.space(3);',
      /Unknown spacing "3"/,
    ],
    [
      'rejects missing map keys',
      '$value: base.safe-map-get((focus: black), missing, role);',
      /safe-map-get\(\): missing role "missing"/,
    ],
    [
      'rejects non-map values',
      '$value: base.safe-map-get(null, focus, role);',
      /safe-map-get\(\): role map is null or not a map/,
    ],
  ]) {
    it(name, () => {
      assert.throws(
        () => sass.compileString(`@use 'base'; ${body}`, sassOptions),
        error,
      );
    });
  }
});
