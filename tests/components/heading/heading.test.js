import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const sourceDirectory = new URL(
  '../../../src/components/heading/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const template = twig.twig({
  data: readFileSync(new URL('./heading.twig', sourceDirectory), 'utf8'),
  rethrow: true,
});

function renderHeading(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('uses the semantic level independently of the first display modifier', () => {
  const heading = renderHeading({
    heading__level: 3,
    heading__modifiers: ['scoped', 'display', 'h2'],
    heading__content: 'Guide to building components',
  });

  expect(heading.tagName).toBe('H3');
  expect(heading.dataset.headingStyle).toBe('display');
  expect(heading.classList.contains('heading--scoped')).toBe(true);
});

test.each([
  [undefined, 'H1'],
  ['script', 'H1'],
  ['02', 'H1'],
  ['4', 'H4'],
])('renders a safe heading for level %s', (level, tagName) => {
  const heading = renderHeading({
    heading__level: level,
    heading__content: 'A semantic heading',
  });

  expect(heading.tagName).toBe(tagName);
  expect(heading.dataset.headingStyle).toBe(tagName.toLowerCase());
  expect(heading.querySelector('a')).toBeNull();
});

test('renders the plain anchor and preserves composed heading classes', () => {
  const heading = renderHeading({
    heading__content: 'View workshops',
    heading__url: '/workshops',
    heading__blockname: 'card',
    heading__base_class: 'title',
    heading__attributes: { id: 'workshops' },
    heading__link_base_class: 'heading-link',
    heading__link_blockname: 'card',
    heading__link_attributes: { class: 'js-track', 'data-event': 'workshops' },
  });
  const link = heading.querySelector('a');

  expect([...heading.classList]).toEqual(['card__title', 'heading']);
  expect(heading.id).toBe('workshops');
  expect([...link.classList]).toEqual(['card__heading-link', 'js-track']);
  expect(link.getAttribute('href')).toBe('/workshops');
  expect(link.dataset.event).toBe('workshops');
  expect(link.textContent).toBe('View workshops');
});

test('renders a composed heading control as markup and omits an unsafe link', () => {
  const heading = renderHeading({
    heading__content: '<button type="button">Toggle details</button>',
    heading__url: 'javascript:alert(1)',
  });

  expect(heading.querySelector('button').textContent).toBe('Toggle details');
  expect(heading.querySelector('a')).toBeNull();
});
