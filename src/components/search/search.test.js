import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';
import once from '../../../node_modules/@drupal/once/src/once.js';

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const parse = (path) => twig.twig({ data: read(path), rethrow: true });

twig.extendFilter('t', (value) => value);
twig.extendFunction('source', (path) =>
  read('../../../' + path.replace('@assets/', 'assets/')),
);
const components = {
  '@components/cta/cta.twig': parse('../cta/cta.twig'),
  '@components/icon/icon.twig': parse('../icon/icon.twig'),
};
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) =>
    components[path] ? (props) => components[path].render(props) : undefined,
  ),
);
const template = parse('./search.twig');
let behavior;

function render(props = {}) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

beforeAll(async () => {
  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;
  await import('./search.js');
  behavior = globalThis.Drupal.behaviors.headerSearch;
});

afterAll(() => {
  delete globalThis.Drupal;
  delete globalThis.once;
});

test('renders a named search landmark with a usable native GET form', () => {
  const search = render({ search__label: 'Search the library' });
  const landmark = search.querySelector('search');
  const form = landmark.querySelector('form');
  const field = form.querySelector('input');

  expect(landmark.getAttribute('aria-label')).toBe('Site search');
  expect(form.getAttribute('action')).toBe('/search');
  expect(form.method).toBe('get');
  expect(field.name).toBe('keys');
  expect(field.labels[0].textContent.trim()).toBe('Search the library');
  expect(form.querySelector('button').type).toBe('submit');
  expect(form.querySelector('button svg').getAttribute('aria-hidden')).toBe(
    'true',
  );
});

test('allows a visually hidden label and a Drupal form override', () => {
  let search = render({ search__show_label: false });
  expect(
    search
      .querySelector('.search__label')
      .classList.contains('visually-hidden'),
  ).toBe(true);

  search = render({
    search__form_content:
      '<form><label>Catalog <input type="search"></label><button>Find</button></form>',
  });
  expect(search.querySelectorAll('form')).toHaveLength(1);
  expect(search.querySelector('input').labels[0].textContent.trim()).toBe(
    'Catalog',
  );
});

test('keeps the form in its landmark and restores focus on Escape', () => {
  const search = render({ search__id: 'catalog', search__show_toggle: true });
  const panel = search.querySelector('search');
  const toggle = search.querySelector('[data-search-toggle]');
  const field = panel.querySelector('input');

  expect(toggle.hidden).toBe(true);
  expect(panel.hidden).toBe(false);
  expect(toggle.getAttribute('aria-controls')).toBe(panel.id);
  behavior.attach(document);
  behavior.attach(search);
  expect(toggle.hidden).toBe(false);
  expect(panel.hidden).toBe(true);

  toggle.click();
  expect(toggle.getAttribute('aria-expanded')).toBe('true');
  expect(panel.hidden).toBe(false);
  expect(document.activeElement).toBe(field);

  field.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }),
  );
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  expect(panel.hidden).toBe(true);
  expect(document.activeElement).toBe(toggle);

  behavior.detach(search, {}, 'unload');
  expect(toggle.hidden).toBe(true);
  expect(panel.hidden).toBe(false);
  behavior.attach(search);
  toggle.click();
  expect(panel.hidden).toBe(false);
});

test('does not render a disclosure without a stable panel ID', () => {
  expect(
    render({ search__show_toggle: true }).querySelector('[data-search-toggle]'),
  ).toBeNull();
});
