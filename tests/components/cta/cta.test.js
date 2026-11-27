import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import {
  addAttributesTwigFunction,
  registerTwigExtensions,
} from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const sourceDirectory = new URL(
  '../../../src/components/cta/',
  import.meta.url,
);

const { jest } = import.meta;
const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const readTemplate = (path) =>
  readFileSync(new URL(path, sourceDirectory), 'utf8');

twig.extendFilter('t', (value) => value);
twig.extendFunction('source', (path) =>
  readTemplate('../../../' + path.replace('@assets/', 'assets/')),
);

const icon = twig.twig({
  data: readTemplate('../icon/icon.twig'),
  rethrow: true,
});

twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) => {
    if (path === '@components/icon/icon.twig') {
      return (props) => icon.render(props);
    }
    return undefined;
  }),
);

// Emulate Drupal's Attribute and link renderer with the Twig.js adapters.
twig.extendFunction('add_attributes', function (values) {
  const attributes = addAttributesTwigFunction.call(this, values);
  attributes.toArray = () => attributes.toObject();
  return attributes;
});
const buildLink = jest.fn((title, url) => ({
  '#type': 'link',
  '#title': title,
  '#url': { ...url },
}));
const renderLink = jest.fn((link) => {
  if (link['#access'] === false) return '';
  const attributes = addAttributesTwigFunction({
    ...link['#options'].attributes,
    href: link['#url'].href,
  });
  return `<a ${attributes}>${link['#title']}</a>`;
});
twig.extendFunction('link', buildLink);
twig.extendFilter('render', renderLink);

const template = twig.twig({
  id: 'cta',
  data: readTemplate('./cta.twig'),
  allowInlineIncludes: true,
  rethrow: true,
});

function renderCTA(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

beforeEach(() => {
  buildLink.mockClear();
  renderLink.mockClear();
});

test.each([
  [undefined, 'A', '/events'],
  ['a', 'A', '/events'],
  ['button', 'BUTTON', null],
  ['span', 'SPAN', null],
  ['script', 'A', '/events'],
])('renders a safe element for %s', (element, tagName, href) => {
  const action = renderCTA({
    cta__element: element,
    cta__text: 'View events',
    cta__url: '/events',
  });

  expect(action.tagName).toBe(tagName);
  expect(action.getAttribute('href')).toBe(href);
  expect(action.classList.contains('cta')).toBe(true);
  expect(action.querySelector('.cta__label').textContent).toBe('View events');
});

test.each([
  [undefined, 'button'],
  [null, 'button'],
  ['submit', 'submit'],
  ['reset', 'reset'],
  ['invalid', 'button'],
])('renders the native button type for %s', (type, expected) => {
  const action = renderCTA({
    cta__element: 'button',
    cta__button_type: type,
    cta__attributes: { type: 'submit' },
  });

  expect(action.getAttribute('type')).toBe(expected);
});

test('keeps the root CTA class and applies the first visual modifier', () => {
  const action = renderCTA({
    cta__modifiers: ['featured', 'secondary', 'clean'],
    cta__blockname: 'card',
    cta__additional_classes: ['custom'],
    cta__attributes: { class: ['js-action'], 'data-action': 'details' },
  });

  expect([...action.classList]).toEqual(
    expect.arrayContaining(['cta', 'card__cta', 'custom', 'js-action']),
  );
  expect(action.dataset.ctaVariant).toBe('secondary');
  expect(action.dataset.action).toBe('details');
});

test.each([
  ['left', 0],
  ['right', 1],
  [null, 1],
])('inlines the decorative SVG at %s', (position, index) => {
  const action = renderCTA({
    cta__text: 'Explore',
    cta__icon: 'arrow-right',
    cta__icon_position: position,
  });
  const iconElement = action.children[index];

  expect(iconElement.matches('.cta__icon')).toBe(true);
  expect(iconElement.getAttribute('aria-hidden')).toBe('true');
  const artwork = new DOMParser().parseFromString(
    readTemplate('../../../assets/icons/arrow-right.svg'),
    'image/svg+xml',
  );
  expect(iconElement.getAttribute('viewBox')).toBe(
    artwork.documentElement.getAttribute('viewBox'),
  );
  expect(iconElement.querySelector('path').getAttribute('d')).toBe(
    artwork.querySelector('path').getAttribute('d'),
  );
});

test('adds protected new-tab navigation and a spoken note after the label', () => {
  const action = renderCTA({
    cta__text: 'Read the guide',
    cta__url: 'https://example.com/guide',
    cta__new_tab: true,
    cta__attributes: { rel: 'external opener' },
  });

  expect(action.target).toBe('_blank');
  expect(action.rel.split(' ')).toEqual(['external', 'noopener', 'noreferrer']);
  expect(action.textContent.trim()).toBe('Read the guide (opens in a new tab)');
  expect(action.lastElementChild.matches('.visually-hidden')).toBe(true);
});

test('leaves the new-tab attributes off native buttons', () => {
  const action = renderCTA({
    cta__element: 'button',
    cta__text: 'Apply',
    cta__new_tab: true,
  });

  expect(action.hasAttribute('target')).toBe(false);
  expect(action.hasAttribute('rel')).toBe(false);
  expect(action.textContent.trim()).toBe('Apply');
});

test('escapes label text and omits unsafe destinations', () => {
  const action = renderCTA({
    cta__url: 'javascript:alert(1)',
    cta__text: '<b>Read the guide</b>',
    cta__new_tab: true,
  });

  expect(action.hasAttribute('href')).toBe(false);
  expect(action.hasAttribute('target')).toBe(false);
  expect(action.querySelector('b')).toBeNull();
  expect(action.textContent.trim()).toBe('<b>Read the guide</b>');
});

test('preserves Drupal link metadata and merges the CTA attributes', () => {
  const url = {
    href: '/events?view=all',
    options: { attributes: { rel: 'external' } },
  };
  const cache = { tags: ['node:1'] };
  const action = renderCTA({
    cta__link: {
      '#type': 'link',
      '#url': url,
      '#title': 'Browse events',
      '#cache': cache,
      '#attributes': { class: 'existing', 'data-track': 'events' },
      '#options': {
        query: { view: 'all' },
        attributes: { class: ['option-class'], target: '_blank' },
      },
    },
    cta__modifiers: ['link'],
  });

  expect(buildLink).toHaveBeenCalledWith(
    expect.stringContaining('Browse events'),
    url,
  );
  expect(renderLink).toHaveBeenCalledWith(
    expect.objectContaining({
      '#type': 'link',
      '#cache': cache,
      '#options': expect.objectContaining({ query: { view: 'all' } }),
    }),
    expect.anything(),
  );
  expect(action.getAttribute('href')).toBe('/events?view=all');
  expect([...action.classList]).toEqual(
    expect.arrayContaining(['cta', 'existing', 'option-class']),
  );
  expect(action.dataset.track).toBe('events');
  expect(action.target).toBe('_blank');
  expect(action.rel).toBe('external noopener noreferrer');
  expect(action.textContent.trim()).toBe('Browse events (opens in a new tab)');
  expect(url.options.attributes).toEqual({ rel: 'external' });
});

test('renders an anchor when Storybook supplies a string in the link fixture', () => {
  const action = renderCTA({
    cta__link: {
      '#type': 'link',
      '#title': 'Browse events',
      '#url': '#events',
    },
  });

  expect(buildLink).not.toHaveBeenCalled();
  expect(action.getAttribute('href')).toBe('#events');
  expect(action.textContent.trim()).toBe('Browse events');
});
