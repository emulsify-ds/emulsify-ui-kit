import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const templates = new Map(
  ['list', '_list-item'].map((name) => [
    `@components/list/${name}.twig`,
    twig.twig({
      id: `@components/list/${name}.twig`,
      data: readFileSync(new URL(`./${name}.twig`, import.meta.url), 'utf8'),
      allowInlineIncludes: true,
      rethrow: true,
    }),
  ]),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) => {
    const template = templates.get(path);
    return template && ((props) => template.render(props));
  }),
);

function renderList(props = {}) {
  document.body.innerHTML = templates
    .get('@components/list/list.twig')
    .render(props);
  return document.body.firstElementChild;
}

test('uses a native ordered list for meaningful sequences and nests children in the parent item', () => {
  const list = renderList({
    list__type: 'ol',
    list__items: [
      {
        content: 'Parent item',
        children: { type: 'ul', items: ['Child item'] },
        attributes: { id: 'parent-item' },
      },
      'Next item',
    ],
  });

  expect(list.tagName).toBe('OL');
  expect(list.hasAttribute('role')).toBe(false);
  expect(
    list.querySelector(':scope > #parent-item > ul > li').textContent.trim(),
  ).toBe('Child item');
  expect(list.querySelector(':scope > li:last-child').textContent.trim()).toBe(
    'Next item',
  );
});

test.each(['inline', 'plain'])(
  'keeps list semantics in the marker-free %s variant',
  (variant) => {
    const list = renderList({
      list__items: ['First item'],
      list__modifiers: [variant],
    });

    expect(list.tagName).toBe('UL');
    expect(list.getAttribute('role')).toBe('list');
    expect(list.dataset.listStyle).toBe(variant);
  },
);

test('falls back to an unordered list and renders slot content without item data', () => {
  const list = renderList({
    list__type: 'div',
    list__content: '<li>Composed item</li>',
    list__blockname: 'preview',
    list__additional_classes: ['example'],
    list__attributes: { 'aria-label': 'Items' },
  });

  expect(list.tagName).toBe('UL');
  expect(list.querySelector('li').textContent).toBe('Composed item');
  expect(list.classList.contains('preview__list')).toBe(true);
  expect(list.classList.contains('example')).toBe(true);
  expect(list.getAttribute('aria-label')).toBe('Items');
});

test('keeps an overridden item block in an embedded list without sample data', () => {
  const template = twig.twig({
    data: `{% embed '@components/list/list.twig' %}
      {% block list__content %}<li>Embedded item</li>{% endblock %}
    {% endembed %}`,
    allowInlineIncludes: true,
    rethrow: true,
  });
  document.body.innerHTML = template.render({});

  expect(document.querySelector('ul > li').textContent).toBe('Embedded item');
});

test('omits an empty list', () => {
  expect(renderList({ list__items: null })).toBeNull();
});
