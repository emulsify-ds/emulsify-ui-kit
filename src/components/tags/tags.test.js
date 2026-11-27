import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import once from '../../../node_modules/@drupal/once/src/once.js';

const { jest } = import.meta;
const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const template = twig.twig({
  data: readFileSync(new URL('./tags.twig', import.meta.url), 'utf8'),
  rethrow: true,
});

function render(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders a list with static labels and accessible links', () => {
  const list = render({
    tags__items: [
      { title: 'Community' },
      { title: 'Outdoors', url: '/topics/outdoors', color: 'green' },
    ],
    tags__blockname: 'feature',
    tags__attributes: { 'aria-label': 'Topics', class: 'feature-topics' },
  });

  expect(list.tagName).toBe('UL');
  expect(list.getAttribute('role')).toBe('list');
  expect(list.getAttribute('aria-label')).toBe('Topics');
  expect([...list.classList]).toEqual(
    expect.arrayContaining(['tags', 'feature__tags', 'feature-topics']),
  );
  expect(list.children).toHaveLength(2);
  expect(list.querySelector('li > span').textContent).toBe('Community');
  const linkedTag = list.querySelector('li > a');
  expect(linkedTag.textContent).toBe('Outdoors');
  expect(linkedTag.getAttribute('href')).toBe('/topics/outdoors');
  expect(linkedTag.dataset.tagColor).toBe('green');
});

test('skips blank labels, escapes text, and renders unsupported URLs as static labels', () => {
  const list = render({
    tags__items: [
      { title: ' ' },
      { title: '<b>Literal label</b>', url: 'javascript:void(0)' },
    ],
  });

  expect(list.children).toHaveLength(1);
  expect(list.querySelector('li > span').textContent).toBe(
    '<b>Literal label</b>',
  );
  expect(list.querySelector('a, b')).toBeNull();
});

test('supports composed items and omits an empty list', () => {
  expect(render({ tags__items: [] })).toBeNull();
  expect(
    render({
      tags__items: [{ title: 'Default item' }],
      tags__items_content: '<li>Custom item</li>',
    }).textContent.trim(),
  ).toBe('Custom item');
});

test('applies valid custom color accents once, including in an attached element context', async () => {
  const originalCSS = globalThis.CSS;
  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;
  globalThis.CSS = {
    supports: jest.fn(
      (property, value) => property === 'color' && value === 'teal',
    ),
  };

  try {
    await import('./tags.js');
    const list = render({
      tags__items: [
        { title: 'Photography', color: 'teal' },
        { title: 'Invalid', color: 'not-a-color' },
        { title: 'Outdoors', color: 'green' },
      ],
    });
    const [custom, invalid, named] = list.querySelectorAll('.tags__link');

    const behavior = globalThis.Drupal.behaviors.tags;
    behavior.attach(custom);
    behavior.attach(document);
    behavior.attach(list);

    expect(globalThis.CSS.supports).toHaveBeenCalledTimes(2);
    expect(custom.style.getPropertyValue('--tags-accent')).toBe('teal');
    expect(invalid.style.getPropertyValue('--tags-accent')).toBe('');
    expect(named.style.getPropertyValue('--tags-accent')).toBe('');
  } finally {
    globalThis.CSS = originalCSS;
    delete globalThis.Drupal;
    delete globalThis.once;
  }
});
