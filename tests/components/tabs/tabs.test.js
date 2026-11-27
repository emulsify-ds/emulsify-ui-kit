import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';
import { userEvent } from 'storybook/test';
import once from '../../../node_modules/@drupal/once/src/once.js';

const sourceDirectory = new URL(
  '../../../src/components/tabs/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const read = (path) => readFileSync(new URL(path, sourceDirectory), 'utf8');
const parse = (path, id) =>
  twig.twig({ id, data: read(path), allowInlineIncludes: true, rethrow: true });

twig.extendFilter('t', (value) => value);
parse(
  '../../layout/container/container.twig',
  '@layout/container/container.twig',
);
const components = {
  '@components/cta/cta.twig': parse('../cta/cta.twig'),
  '@components/heading/heading.twig': parse('../heading/heading.twig'),
};
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) =>
    components[path] ? (props) => components[path].render(props) : undefined,
  ),
);
const template = parse('./tabs.twig');

const items = [
  { id: 'hours', label: 'Opening hours', content: 'Open weekdays.' },
  { id: 'services', label: 'Services', content: 'Ask a librarian.' },
  { id: 'access', label: 'Building access', content: 'Use the ramp.' },
];

function render(props = {}) {
  document.body.insertAdjacentHTML(
    'beforeend',
    template.render({
      tabs__id: 'library-visit',
      tabs__items: items,
      ...props,
    }),
  );
  return document.body.lastElementChild;
}

function parts(container) {
  return {
    list: container.querySelector('[role="tablist"]'),
    tabs: [...container.querySelectorAll('[role="tab"]')],
    panels: [...container.querySelectorAll('[role="tabpanel"]')],
  };
}

function expectSelection({ tabs, panels }, selected) {
  expect(tabs.map((tab) => tab.getAttribute('aria-selected'))).toEqual(
    tabs.map((_, index) => String(index === selected)),
  );
  expect(tabs.map((tab) => tab.tabIndex)).toEqual(
    tabs.map((_, index) => (index === selected ? 0 : -1)),
  );
  expect(panels.map((panel) => panel.hidden)).toEqual(
    panels.map((_, index) => index !== selected),
  );
}

function press(element, key, options = {}) {
  const event = new KeyboardEvent('keydown', {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });
  element.dispatchEvent(event);
  return event.defaultPrevented;
}

beforeAll(async () => {
  globalThis.once = once;
  globalThis.Drupal = { behaviors: {} };
  await import('../../../src/components/tabs/tabs.js');
});

afterEach(() => {
  Drupal.behaviors.tabs.detach(document, {}, 'unload');
  document.body.replaceChildren();
  window.history.replaceState(null, '', window.location.pathname);
});

afterAll(() => {
  delete globalThis.Drupal;
  delete globalThis.once;
});

test('renders the APG relationships and keeps every panel readable before attaching', () => {
  const container = render({
    tabs__heading: 'Visiting the library',
    tabs__heading_level: 2,
    tabs__theme: 'default',
    tabs__theme__variation: 'dark',
    tabs__bg_color: true,
    tabs__width: 'narrow',
    tabs__alignment: 'right',
    tabs__spacing: 'half',
    tabs__container__modifiers: ['visit'],
  });
  const { list, tabs, panels } = parts(container);
  expect(container.id).toBe('section-library-visit');
  expect(container.dataset.componentTheme).toBe('default dark');
  expect(container.dataset.componentWidth).toBe('narrow');
  expect(container.dataset.componentAlignment).toBe('right');
  expect(container.dataset.componentSpacing).toBe('half');
  expect(container.classList.contains('container--visit')).toBe(true);
  expect(container.querySelector('.tabs').dataset.tabsDisplay).toBe(
    'horizontal-plain',
  );
  expect(list.tagName).toBe('UL');
  expect(list.hidden).toBe(true);
  expect(
    document.getElementById(list.getAttribute('aria-labelledby')).textContent,
  ).toBe('Visiting the library');
  expect(tabs.map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
  expect(tabs.map((tab) => tab.getAttribute('aria-selected'))).toEqual([
    'true',
    'false',
    'false',
  ]);
  expect(tabs.map((tab) => tab.type)).toEqual(['button', 'button', 'button']);
  expect(tabs.map((tab) => tab.parentElement.getAttribute('role'))).toEqual([
    'presentation',
    'presentation',
    'presentation',
  ]);
  expect(panels.map((panel) => panel.hidden)).toEqual([false, false, false]);

  panels.forEach((panel, index) => {
    expect(panel.id).toBe('tabs-library-visit:panel:' + items[index].id);
    expect(panel.tabIndex).toBe(0);
    expect(tabs[index].id).toBe('tabs-library-visit:tab:' + items[index].id);
    expect(tabs[index].getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(tabs[index].id);
    expect(panel.querySelector('h3').textContent).toBe(items[index].label);
  });
});

test('moves focus and selection with arrows, Home, and End, and then tabs to the panel', async () => {
  const container = render({ tabs__label: 'Library services' });
  const view = parts(container);
  const widget = container.querySelector('.tabs');
  Drupal.behaviors.tabs.attach(widget);
  Drupal.behaviors.tabs.attach(document);
  expect(view.list.hidden).toBe(false);
  expect(view.list.getAttribute('aria-label')).toBe('Library services');
  expectSelection(view, 0);

  const user = userEvent.setup();
  await user.tab();
  expect(document.activeElement).toBe(view.tabs[0]);

  for (const [key, index] of [
    ['ArrowLeft', 2],
    ['ArrowRight', 0],
    ['ArrowRight', 1],
    ['End', 2],
    ['Home', 0],
  ]) {
    expect(press(document.activeElement, key)).toBe(true);
    expect(document.activeElement).toBe(view.tabs[index]);
    expectSelection(view, index);
  }

  for (const key of ['ArrowUp', 'ArrowDown']) {
    expect(press(document.activeElement, key)).toBe(false);
  }
  expect(press(document.activeElement, 'ArrowLeft', { altKey: true })).toBe(
    false,
  );
  expectSelection(view, 0);
  await user.tab();
  expect(document.activeElement).toBe(view.panels[0]);
});

test('starts at a matching fragment and keeps separate instances isolated', () => {
  const first = parts(render({ tabs__active: 'services' }));
  const second = parts(render({ tabs__id: 'second-visit' }));
  window.history.replaceState(null, '', '#tabs-second-visit%3Apanel%3Aaccess');
  Drupal.behaviors.tabs.attach(document);
  expectSelection(first, 1);
  expectSelection(second, 2);

  first.tabs[0].querySelector('.cta__label').click();
  expectSelection(first, 0);
  expectSelection(second, 2);
  expect(window.location.hash).toBe('#tabs-library-visit:panel:hours');

  window.history.replaceState(null, '', '#tabs-second-visit:tab:services');
  window.dispatchEvent(new Event('hashchange'));
  expectSelection(first, 0);
  expectSelection(second, 1);
});

test.each(['', 'hours', 'invalid item id'])(
  'keeps panels visible without emitting tab relationships for item id %p',
  (id) => {
    const container = render({ tabs__items: [items[0], { ...items[1], id }] });
    Drupal.behaviors.tabs.attach(container);
    expect(
      container.querySelector('[role="tablist"], [role="tabpanel"]'),
    ).toBeNull();
    expect(container.querySelectorAll('.tabs__panel')).toHaveLength(2);
    expect(
      [...container.querySelectorAll('.tabs__panel')].every(
        (panel) => !panel.hidden && !panel.id,
      ),
    ).toBe(true);
  },
);

test('keeps composed content readable when the slot has no matching panel IDs', () => {
  const container = render({
    tabs__panels_content: '<p>Independent library information.</p>',
  });
  Drupal.behaviors.tabs.attach(container);
  expect(parts(container).list.hidden).toBe(true);
  expect(container.querySelector('.tabs__panels').textContent.trim()).toBe(
    'Independent library information.',
  );
});

test('restores the unenhanced layout on unload', () => {
  const container = render();
  const widget = container.querySelector('.tabs');
  const { list, tabs, panels } = parts(container);
  Drupal.behaviors.tabs.attach(widget);
  press(tabs[0], 'End');
  Drupal.behaviors.tabs.detach(widget, {}, 'unload');

  expect(list.hidden).toBe(true);
  expect(widget.hasAttribute('data-tabs-enhanced')).toBe(false);
  expect(panels.every((panel) => !panel.hidden)).toBe(true);
  expect(press(tabs[0], 'End')).toBe(false);
  Drupal.behaviors.tabs.attach(widget);
  expectSelection({ tabs, panels }, 0);
});
