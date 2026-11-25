import { readFileSync } from 'node:fs';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import Twig from '../../../node_modules/twig/twig.js';

const twig = registerTwigExtensions(Twig.factory());
const template = twig.twig({
  data: readFileSync(new URL('./grid.twig', import.meta.url), 'utf8'),
  rethrow: true,
});

function renderGrid(props) {
  document.body.innerHTML = template.render(props);
  return document.querySelector('.grid');
}

test.each([
  { grid__columns: 3 },
  { grid__columns: 1, grid__column_focus: 1 },
  { grid__columns: 3, grid__column_focus: 4 },
  { grid__columns: 3, grid__column_focus: 'invalid' },
])('uses equal tracks for an unavailable focus column (%j)', (props) => {
  const grid = renderGrid({ grid__type: 'focus', ...props });
  expect(grid.dataset.gridType).toBe('equal');
  expect(grid.hasAttribute('data-grid-column-focus')).toBe(false);
});

test('keeps focus when the position is within the column ceiling', () => {
  const grid = renderGrid({
    grid__type: 'focus',
    grid__columns: '3',
    grid__column_focus: 2,
  });
  expect(grid.dataset.gridType).toBe('focus');
  expect(grid.dataset.gridColumnFocus).toBe('2');
});

test('keeps outer and inner attributes on their own elements', () => {
  const grid = renderGrid({
    grid__attributes: { id: 'outer' },
    grid__inner__attributes: { id: 'inner' },
  });
  expect(grid.id).toBe('outer');
  expect(grid.querySelector('.grid__inner').id).toBe('inner');
});
