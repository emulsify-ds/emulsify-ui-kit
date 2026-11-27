import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';
import once from '../../../node_modules/@drupal/once/src/once.js';

const sourceDirectory = new URL(
  '../../../src/components/table/',
  import.meta.url,
);

const { jest } = import.meta;
const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const parse = (name) =>
  twig.twig({
    data: readFileSync(new URL(name, sourceDirectory), 'utf8'),
    rethrow: true,
  });
const cell = parse('./_table-cell.twig');
twig.extendFilter('t', (text) => text);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((name) =>
    name === '@components/table/_table-cell.twig'
      ? (props) => cell.render(props)
      : undefined,
  ),
);
const template = parse('./table.twig');

function renderTable(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders scoped headers, data cells, and optional footer', () => {
  const region = renderTable({
    table__caption: 'Room capacities',
    table__header: [{ cells: ['Room', { content: 'Seats', scope: 'col' }] }],
    table__rows: [
      {
        attributes: { 'data-room': 'studio' },
        cells: [
          { tag: 'th', content: 'Studio' },
          { tag: 'td', content: 0, attributes: { scope: 'row' } },
        ],
      },
    ],
    table__footer: [{ header: true, content: 'Total' }, 0],
    table__attributes: { class: 'room-capacities' },
  });

  expect(region.dataset.tableScrollLabel).toBe('Room capacities');
  expect(region.querySelector('caption').textContent).toBe('Room capacities');
  expect(region.querySelector('table').classList).toContain('room-capacities');
  expect(region.querySelectorAll('thead th[scope="col"]')).toHaveLength(2);
  expect(region.querySelector('tbody [data-room="studio"] th').scope).toBe(
    'row',
  );
  expect(region.querySelector('tbody td').textContent).toBe('0');
  expect(region.querySelector('tbody td').hasAttribute('scope')).toBe(false);
  expect(region.querySelector('tfoot th').scope).toBe('row');
});

test('omits the caption and spans the empty message across the headers', () => {
  const region = renderTable({
    table__scroll_label: 'Room schedule',
    table__header: [
      { content: 'Room and staff', scope: 'colgroup', colspan: 2 },
      'Hours',
    ],
    table__empty: 'No rooms available',
  });

  expect(region.dataset.tableScrollLabel).toBe('Room schedule');
  expect(region.querySelector('caption')).toBeNull();
  expect(region.querySelector('th').scope).toBe('colgroup');
  const message = region.querySelector('tbody td');
  expect(message.colSpan).toBe(3);
  expect(message.textContent).toBe('No rooms available');
});

test('adds named keyboard scrolling only while the table overflows', async () => {
  const observe = jest.fn();
  const disconnect = jest.fn();
  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;
  globalThis.ResizeObserver = jest.fn(() => ({ observe, disconnect }));

  try {
    await import('../../../src/components/table/table.js');
    const region = renderTable({
      table__caption: 'Room schedule',
      table__header: ['Room', 'Hours'],
    });
    const { emulsifyTable } = globalThis.Drupal.behaviors;
    let scrollWidth = 300;
    Object.defineProperties(region, {
      clientWidth: { value: 300 },
      scrollWidth: { get: () => scrollWidth },
    });

    emulsifyTable.attach(region);
    emulsifyTable.attach(document);
    expect(globalThis.ResizeObserver).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(region);
    expect(observe).toHaveBeenCalledWith(region.querySelector('table'));
    expect(region.hasAttribute('tabindex')).toBe(false);
    expect(region.hasAttribute('role')).toBe(false);

    const [onResize] = globalThis.ResizeObserver.mock.calls[0];
    scrollWidth = 500;
    onResize();
    expect(region.tabIndex).toBe(0);
    expect(region.getAttribute('role')).toBe('region');
    expect(region.getAttribute('aria-label')).toBe('Room schedule');

    scrollWidth = 300;
    onResize();
    expect(region.hasAttribute('tabindex')).toBe(false);
    expect(region.hasAttribute('role')).toBe(false);
    expect(region.hasAttribute('aria-label')).toBe(false);

    emulsifyTable.detach(region, {}, 'unload');
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(region.hasAttribute('data-once')).toBe(false);
  } finally {
    delete globalThis.Drupal;
    delete globalThis.once;
    delete globalThis.ResizeObserver;
  }
});
