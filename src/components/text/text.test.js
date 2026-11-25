import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const parseTemplate = (file, id) =>
  twig.twig({
    id,
    data: readFileSync(new URL(file, import.meta.url), 'utf8'),
    allowInlineIncludes: true,
    rethrow: true,
  });

parseTemplate(
  '../../layout/container/container.twig',
  '@layout/container/container.twig',
);
const wholeTemplate = parseTemplate('./text.twig');
const elementTemplate = parseTemplate('./_text.twig');

function renderText(template, props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders the complete formatted value with shared container props', () => {
  const section = renderText(wholeTemplate, {
    text__content: '<h2>Opening hours</h2><p>Saturday and Sunday.</p>',
    text__width: 'wide',
    text__theme: 'default',
    text__theme__variation: 'dark',
    text__spacing: 'two',
    text__id: 'hours',
    text__bg_color: true,
    text__container__modifiers: ['quiet'],
    text__blockname: 'workshop',
    text__attributes: { 'data-purpose': 'hours' },
  });

  expect(section.id).toBe('section-hours');
  expect(section.classList.contains('container--quiet')).toBe(true);
  expect(section.dataset).toMatchObject({
    componentWidth: 'wide',
    componentTheme: 'default dark',
    componentSpacing: 'two',
    componentBg: 'true',
  });
  const text = section.querySelector('.text.workshop__text');
  expect(text.dataset.purpose).toBe('hours');
  expect(text.querySelector('h2').textContent).toBe('Opening hours');
  expect(text.querySelector('p').textContent).toBe('Saturday and Sunday.');
});

test('renders a formatted slot without a duplicate wrapper', () => {
  const section = renderText(wholeTemplate, {
    text__formatted_content: '<p>This comes from a slot.</p>',
    text__content: '<p>This is the fallback.</p>',
  });

  expect(section.querySelectorAll('.text')).toHaveLength(1);
  expect(section.querySelector('.text').textContent.trim()).toBe(
    'This comes from a slot.',
  );
});

test.each([
  [undefined, 'P'],
  ['script', 'P'],
  ['div', 'DIV'],
  ['span', 'SPAN'],
])('renders a safe single element for %s', (element, tagName) => {
  const text = renderText(elementTemplate, {
    text__element: element,
    text__content: 'An inline description',
    text__base_class: 'description',
    text__blockname: 'card',
    text__attributes: { id: 'item-description' },
  });

  expect(text.tagName).toBe(tagName);
  expect(text.classList.contains('card__description')).toBe(true);
  expect(text.id).toBe('item-description');
  expect(text.textContent).toBe('An inline description');
});
