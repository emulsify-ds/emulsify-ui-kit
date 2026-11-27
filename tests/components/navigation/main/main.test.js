import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';
import once from '../../../../node_modules/@drupal/once/src/once.js';

const sourceDirectory = new URL(
  '../../../../src/components/navigation/main/',
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
twig.extendFunction('source', (path) =>
  read('../../../../' + path.replace('@assets/', 'assets/')),
);
const templates = new Map(
  [
    ['navigation/base/_menu-list.twig', '../base/_menu-list.twig'],
    ['navigation/base/_menu-item.twig', '../base/_menu-item.twig'],
    [
      'navigation/base/menu-toggle/menu-toggle.twig',
      '../base/menu-toggle/menu-toggle.twig',
    ],
    ['navigation/base/menu.twig', '../base/menu.twig'],
    ['cta/cta.twig', '../../cta/cta.twig'],
    ['icon/icon.twig', '../../icon/icon.twig'],
  ].map(([name, path]) => {
    const id = '@components/' + name;
    return [id, parse(path, id)];
  }),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((name) =>
    templates.has(name)
      ? (props) => templates.get(name).render(props)
      : undefined,
  ),
);
const main = parse('./main.twig');
const items = [
  {
    id: 'visit',
    title: 'Visit',
    url: '/visit',
    below: [
      { id: 'hours', title: 'Opening hours', url: '/hours' },
      {
        id: 'locations',
        title: 'Locations',
        below: [
          { id: 'library', title: 'Main library', url: '/location/library' },
        ],
      },
    ],
  },
  { id: 'browse', title: 'Browse', url: '/browse', current: true },
];

function render(itemsOverride = items, id = 'library-menu') {
  document.body.innerHTML = main.render({
    main__id: id,
    main__items: itemsOverride,
  });
  return document.querySelector('[data-menu]');
}

const toggles = (menu) => [
  ...menu.querySelectorAll('[data-menu-toggle="submenu"]'),
];
const panelFor = (toggle) =>
  document.getElementById(toggle.getAttribute('aria-controls'));

function key(element, value) {
  const event = new KeyboardEvent('keydown', {
    key: value,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
  return event;
}

beforeAll(async () => {
  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;
  await import('../../../../src/components/navigation/base/menu-toggle/menu-toggle.js');
  await import('../../../../src/components/navigation/main/main.js');
});

afterEach(() => {
  Drupal.behaviors.mainNav.detach(document, {}, 'unload');
  Drupal.behaviors.menuToggle.detach(document, {}, 'unload');
  document.body.replaceChildren();
});

test('exposes links before behavior attachment and generates stable submenu IDs by item key', () => {
  let menu = render();
  expect(menu.getAttribute('aria-label')).toBe('Main navigation');
  const [toggle, nested] = toggles(menu);
  expect(toggle.hidden).toBe(true);
  expect(toggle.type).toBe('button');
  expect(panelFor(toggle).hidden).toBe(false);
  expect(panelFor(nested).querySelector('a').getAttribute('href')).toBe(
    '/location/library',
  );
  expect(menu.querySelector('[aria-current="page"]').textContent).toBe(
    'Browse',
  );
  const ids = [panelFor(toggle).id, panelFor(nested).id];

  menu = render([...items].reverse());
  expect(toggles(menu).map((button) => panelFor(button).id)).toEqual(ids);
  expect(ids).toEqual([
    'library-menu--key-visit--submenu',
    'library-menu--key-visit--key-locations--submenu',
  ]);
});

test('uses independent native buttons and returns focus from the nearest submenu on Escape', () => {
  const menu = render();
  const [toggle, nested] = toggles(menu);
  Drupal.behaviors.menuToggle.attach(menu);
  Drupal.behaviors.menuToggle.attach(menu);

  expect(toggle.hidden).toBe(false);
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  expect(panelFor(toggle).hidden).toBe(true);
  toggle.focus();
  // Native Enter and Space dispatch the same click activation in a browser.
  toggle.click();
  nested.click();
  const leaf = panelFor(nested).querySelector('a');
  leaf.focus();
  expect(key(leaf, 'Escape').defaultPrevented).toBe(true);
  expect(document.activeElement).toBe(nested);
  expect(panelFor(nested).hidden).toBe(true);
  expect(panelFor(toggle).hidden).toBe(false);

  expect(key(nested, 'Tab').defaultPrevented).toBe(false);
  key(nested, 'Escape');
  expect(document.activeElement).toBe(toggle);
  expect(panelFor(toggle).hidden).toBe(true);
});

test('compacts only when inline links exceed available width and preserves operable focus across changes', () => {
  const menu = render();
  const list = menu.querySelector('[data-menu-root-panel] > ul');
  const panel = list.parentElement;
  const toggle = menu.querySelector('[data-menu-toggle="root"]');
  const oldResizeObserver = globalThis.ResizeObserver;
  let available = 1200;
  let resize;
  const started = [];

  globalThis.ResizeObserver = class {
    constructor(callback) {
      resize = callback;
    }
    observe(node) {
      started.push(node);
    }
    disconnect() {}
  };
  Object.defineProperty(menu, 'clientWidth', { get: () => available });
  list.getBoundingClientRect = () => ({
    width: menu.dataset.menuMeasuring === 'true' ? 500 : 0,
  });

  try {
    Drupal.behaviors.menuToggle.attach(menu);
    Drupal.behaviors.mainNav.attach(menu);
    Drupal.behaviors.mainNav.attach(menu);
    expect(started).toEqual([menu]);
    expect(menu.dataset.menuMode).toBe('inline');
    expect(toggle.hidden).toBe(true);
    expect(panel.hidden).toBe(false);

    list.querySelector('a').focus();
    available = 310;
    resize();
    expect(menu.dataset.menuMode).toBe('compact');
    expect(document.activeElement).toBe(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hidden).toBe(true);
    toggle.click();
    expect(panel.hidden).toBe(false);

    key(toggle, 'Escape');
    expect(panel.hidden).toBe(true);
    available = 600;
    resize();
    expect(toggle.hidden).toBe(true);
    expect(panel.hidden).toBe(false);
    expect(document.activeElement).toBe(list.querySelector('a'));
    expect(menu.hasAttribute('data-menu-measuring')).toBe(false);
  } finally {
    globalThis.ResizeObserver = oldResizeObserver;
  }
});
