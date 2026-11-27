import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';
import { userEvent } from 'storybook/test';
import once from '../../../node_modules/@drupal/once/src/once.js';

const sourceDirectory = new URL(
  '../../../src/components/accordion/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const read = (path) => readFileSync(new URL(path, sourceDirectory), 'utf8');
const loadTemplate = (path, id) =>
  twig.twig({ id, data: read(path), allowInlineIncludes: true, rethrow: true });

twig.extendFilter('t', (value) => value);
twig.extendFunction('source', (path) =>
  read('../../../' + path.replace('@assets/', 'assets/')),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction(
    (path) => (props) => twig.twig({ ref: path }).render(props),
  ),
);
loadTemplate(
  '../../layout/container/container.twig',
  '@layout/container/container.twig',
);
for (const path of [
  'cta/cta',
  'icon/icon',
  'accordion/_accordion-item',
  'accordion/_accordion-controls',
]) {
  loadTemplate(`../${path}.twig`, `@components/${path}.twig`);
}
const template = loadTemplate('./accordion.twig');
const itemTemplate = twig.twig({
  ref: '@components/accordion/_accordion-item.twig',
});
const items = [
  {
    id: 'hours',
    heading: 'Opening hours',
    content: '<a href="/hours">Browse the schedule</a>',
  },
  {
    id: 'rooms',
    heading: 'Meeting rooms',
    content: 'Reserve a room for up to two hours.',
  },
];
const render = (props = {}) =>
  template.render({
    accordion__id: 'library',
    accordion__heading: 'Library services',
    accordion__items: items,
    ...props,
  });

const getToggle = (id = 'hours') =>
  document
    .getElementById(`accordion-library--${id}`)
    .querySelector('[data-accordion-toggle]');
const getPanel = (toggle) =>
  document.getElementById(toggle.getAttribute('aria-controls'));
let behavior;

beforeAll(async () => {
  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;
  await import('../../../src/components/accordion/accordion.js');
  behavior = Drupal.behaviors.accordion;
});

afterAll(() => {
  delete globalThis.Drupal;
  delete globalThis.once;
});

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

test('renders readable headings and panels with hidden controls before enhancement', () => {
  document.body.innerHTML = render({ accordion__show_controls: true });
  const toggle = getToggle();
  const panel = getPanel(toggle);

  expect(toggle.tagName).toBe('BUTTON');
  expect(toggle.type).toBe('button');
  expect(toggle.hidden).toBe(true);
  expect(toggle.parentElement.tagName).toBe('H3');
  expect(toggle.parentElement.hidden).toBe(true);
  expect(toggle.parentElement.children).toHaveLength(1);
  expect(toggle.getAttribute('aria-expanded')).toBe('true');
  expect(panel.id).toBe('accordion-library--hours--panel');
  expect(panel.hidden).toBe(false);
  expect(panel.hasAttribute('aria-hidden')).toBe(false);
  expect(toggle.parentElement.previousElementSibling).toMatchObject({
    textContent: 'Opening hours',
    hidden: false,
  });
  expect(document.querySelector('[data-accordion-controls]').hidden).toBe(true);
});

test('opens and closes with Enter and Space and follows the native Tab sequence', async () => {
  document.body.innerHTML = render();
  behavior.attach(document);
  const user = userEvent.setup();
  const first = getToggle();
  const next = getToggle('rooms');
  const panel = getPanel(first);
  const link = panel.querySelector('a');

  expect(first.hidden).toBe(false);
  expect(first.parentElement.hidden).toBe(false);
  expect(first.parentElement.previousElementSibling.hidden).toBe(true);
  expect(panel.hidden).toBe(true);
  expect(first.getAttribute('aria-expanded')).toBe('false');
  await user.tab();
  expect(document.activeElement).toBe(first);
  await user.tab();
  expect(document.activeElement).toBe(next);
  await user.tab({ shift: true });
  expect(document.activeElement).toBe(first);
  await user.keyboard('{Enter}');
  expect(first.getAttribute('aria-expanded')).toBe('true');
  expect(panel.hidden).toBe(false);
  await user.tab();
  expect(document.activeElement).toBe(link);
  await user.tab({ shift: true });
  await user.keyboard(' ');
  expect(first.getAttribute('aria-expanded')).toBe('false');
  expect(panel.hidden).toBe(true);
  expect(document.activeElement).toBe(first);
});

test('activates optional bulk controls by keyboard and keeps their disabled state current', async () => {
  document.body.innerHTML = render({ accordion__show_controls: true });
  behavior.attach(document);
  const user = userEvent.setup();
  const controls = document.querySelector('[data-accordion-controls]');
  const [expand, collapse] = controls.querySelectorAll('button');
  expect(controls.hidden).toBe(false);
  expect(collapse.getAttribute('aria-disabled')).toBe('true');
  await user.tab();
  expect(document.activeElement).toBe(expand);
  await user.keyboard('{Enter}');
  expect(getPanel(getToggle()).hidden).toBe(false);
  expect(getPanel(getToggle('rooms')).hidden).toBe(false);
  expect(expand.getAttribute('aria-disabled')).toBe('true');
  await user.tab();
  expect(document.activeElement).toBe(collapse);
  await user.keyboard(' ');
  expect(getPanel(getToggle()).hidden).toBe(true);
  expect(getPanel(getToggle('rooms')).hidden).toBe(true);
  expect(collapse.getAttribute('aria-disabled')).toBe('true');
  expect(document.activeElement).toBe(collapse);
});

test('opens a matching fragment on attach and after hash changes', () => {
  document.body.innerHTML = render();
  window.history.replaceState(null, '', '#accordion-library--%68ours');
  behavior.attach(document);
  expect(getPanel(getToggle()).hidden).toBe(false);
  expect(getPanel(getToggle('rooms')).hidden).toBe(true);

  getToggle().click();
  behavior.attach(document);
  expect(getPanel(getToggle()).hidden).toBe(true);

  window.history.replaceState(null, '', '#accordion-library--rooms');
  window.dispatchEvent(new HashChangeEvent('hashchange'));
  expect(getPanel(getToggle('rooms')).hidden).toBe(false);
  expect(document.querySelector('[data-accordion-controls]')).toBeNull();
});

test('keeps IDs distinct across instances and renders invalid or duplicate items as readable content', () => {
  document.body.innerHTML =
    render({
      accordion__items: [
        ...items,
        items[0],
        { heading: 'Unlinked', content: 'Still readable.' },
      ],
    }) + render({ accordion__id: 'annex' });
  const allIds = [...document.querySelectorAll('[id]')].map(
    (element) => element.id,
  );
  expect(new Set(allIds).size).toBe(allIds.length);
  expect(
    document.getElementById('accordion-annex--hours--panel'),
  ).not.toBeNull();
  const staticItems = [
    ...document.querySelectorAll('[data-accordion-item]:not([id])'),
  ];
  expect(staticItems).toHaveLength(2);
  expect(
    staticItems.every(
      (item) => item.querySelector('.accordion__panel').hidden === false,
    ),
  ).toBe(true);
});

test('accepts composed items and enhances new AJAX markup once', () => {
  const item = (id) =>
    itemTemplate.render({
      accordion__id: 'library',
      accordion__item__id: id,
      accordion__item__heading: 'Opening hours',
      accordion__item__content: 'See the schedule.',
    });
  document.body.innerHTML = render({ accordion__items_content: item('hours') });
  const root = document.querySelector('[data-accordion]');
  behavior.attach(root);
  expect(getToggle('hours')).not.toBeNull();
  expect(root.querySelectorAll('[data-accordion-item]')).toHaveLength(1);

  root.insertAdjacentHTML('beforeend', item('rooms'));
  const added = getToggle('rooms').closest('[data-accordion-item]');
  behavior.attach(added);
  behavior.attach(root);
  expect(getPanel(getToggle('rooms')).hidden).toBe(true);
  getToggle('rooms').click();
  expect(getPanel(getToggle('rooms')).hidden).toBe(false);
  expect(getPanel(getToggle('hours')).hidden).toBe(true);
});
