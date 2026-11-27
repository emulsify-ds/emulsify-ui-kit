import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';
import once from '../../../node_modules/@drupal/once/src/once.js';

const sourceDirectory = new URL(
  '../../../src/components/header/',
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
  read('../../../' + path.replace('@assets/', 'assets/')),
);
const components = new Map(
  [
    'cta/cta',
    'icon/icon',
    'image/image',
    'logo/logo',
    'navigation/base/_menu-list',
    'navigation/base/_menu-item',
    'navigation/base/menu-toggle/menu-toggle',
    'navigation/base/menu',
    'navigation/main/main',
    'offcanvas/offcanvas',
    'search/search',
  ].map((name) => {
    const id = `@components/${name}.twig`;
    return [id, parse(`../${name}.twig`, id)];
  }),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((name) =>
    components.has(name)
      ? (props) => components.get(name).render(props)
      : undefined,
  ),
);

const template = parse('./header.twig');
const items = [
  {
    id: 'collection',
    title: 'Collection',
    url: '/collection',
    below: [{ id: 'archive', title: 'Archive', url: '/archive' }],
  },
  { id: 'visit', title: 'Visit', url: '/visit' },
];

function render(props = {}) {
  document.body.innerHTML = template.render({
    header__id: 'library-header',
    header__logo__src: '/logo.svg',
    header__logo__alt: 'Library home',
    header__logo__url: '/',
    header__items: items,
    header__skip_target: 'main-content',
    header__show_search: true,
    ...props,
  });
  return document.body.querySelector('header');
}

const getModeObserver = (header) =>
  observers.find(({ observed }) => observed === header);
const observers = [];

beforeAll(async () => {
  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;
  globalThis.ResizeObserver = class ResizeObserver {
    constructor(callback) {
      this.resize = callback;
      observers.push(this);
    }

    observe(element) {
      this.observed = element;
    }

    disconnect() {
      this.observed = null;
    }
  };

  await import('../../../src/components/navigation/base/menu-toggle/menu-toggle.js');
  await import('../../../src/components/navigation/main/main.js');
  await import('../../../src/components/offcanvas/offcanvas.js');
  await import('../../../src/components/header/header.js');
});

afterEach(() => {
  for (const behavior of Object.values(Drupal.behaviors)) {
    behavior.detach?.(document, {}, 'unload');
  }
  observers.length = 0;
  document.body.replaceChildren();
});

afterAll(() => {
  delete globalThis.Drupal;
  delete globalThis.once;
  delete globalThis.ResizeObserver;
});

test('renders a skip link, logo, and one inline navigation without JavaScript', () => {
  const header = render({ header__theme__variation: 'dark' });
  expect(header.id).toBe('library-header');
  expect(header.dataset.componentTheme).toBe('default dark');
  expect(header.firstElementChild.getAttribute('href')).toBe('#main-content');
  expect(header.querySelector('.logo a img').alt).toBe('Library home');
  expect(header.querySelectorAll('nav')).toHaveLength(1);
  expect(header.querySelector('nav').id).toBe('library-header-navigation');
  expect(
    header.querySelector('[href="/archive"]').closest('[hidden]'),
  ).toBeNull();
  expect(header.querySelector('[data-header-drawer]').hidden).toBe(true);
  expect(header.querySelector('search').id).toBe('library-header-search');
  expect(header.querySelector('search').hidden).toBe(false);
});

test('accepts slots and leaves search or a skip link out when omitted', () => {
  const header = render({
    header__branding_content: '<span>Library</span>',
    header__navigation_content:
      '<nav aria-label="Tools"><a href="/tools">Tools</a></nav>',
    header__show_search: false,
    header__skip_target: null,
  });
  expect(header.querySelector('.header__branding').textContent.trim()).toBe(
    'Library',
  );
  expect(header.querySelector('nav').getAttribute('aria-label')).toBe('Tools');
  expect(header.querySelector('search, .header__skip-link')).toBeNull();
});

test('passes a custom form into Search and namespaces each instance', () => {
  const header = render({
    header__search_form_content:
      '<form action="/catalog"><label>Catalog <input name="q"></label></form>',
  });
  expect(header.querySelector('search form').getAttribute('action')).toBe(
    '/catalog',
  );
  document.body.insertAdjacentHTML(
    'beforeend',
    template.render({ header__id: 'other-header', header__items: items }),
  );
  const ids = [...document.querySelectorAll('[id]')].map((node) => node.id);
  expect(ids).toEqual([...new Set(ids)]);
});

test('moves the same menu into the modal and restores focus across sizes', () => {
  const header = render();
  const bar = header.querySelector('[data-header-bar]');
  const navigation = header.querySelector('nav');
  const home = header.querySelector('[data-header-nav-home]');
  const target = header.querySelector('[data-header-nav-drawer]');
  const drawer = header.querySelector('[data-header-drawer]');
  const trigger = drawer.querySelector('[data-offcanvas-trigger]');
  const dialog = drawer.querySelector('dialog');
  dialog.showModal = () => {
    dialog.open = true;
  };
  dialog.close = () => {
    dialog.open = false;
    if (!drawer.hidden) dialog.dispatchEvent(new Event('close'));
  };

  bar.style.setProperty('--header-menu-mode', 'wide');
  for (const behavior of Object.values(Drupal.behaviors)) {
    behavior.attach(document);
  }
  Drupal.behaviors.emulsifyHeader.attach(header);
  expect(home.contains(navigation)).toBe(true);
  expect(drawer.hidden).toBe(true);

  const firstLink = navigation.querySelector('a');
  firstLink.focus();
  bar.style.setProperty('--header-menu-mode', 'compact');
  getModeObserver(header).resize();
  expect(target.querySelector('nav')).toBe(navigation);
  expect(header.querySelectorAll('nav')).toHaveLength(1);
  expect(document.activeElement).toBe(trigger);
  expect(navigation.querySelector('[data-menu-toggle="root"]').hidden).toBe(
    true,
  );
  expect(navigation.querySelector('[data-menu-root-panel]').hidden).toBe(false);
  trigger.click();
  expect(dialog.open).toBe(true);
  expect(document.activeElement).toBe(
    dialog.querySelector('[data-offcanvas-close]'),
  );

  firstLink.focus();
  bar.style.setProperty('--header-menu-mode', 'wide');
  getModeObserver(header).resize();
  expect(dialog.open).toBe(false);
  expect(drawer.hidden).toBe(true);
  expect(home.querySelector('nav')).toBe(navigation);
  expect(document.activeElement).toBe(firstLink);
});
