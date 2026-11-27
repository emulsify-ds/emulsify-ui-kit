import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const sourceDirectory = new URL(
  '../../../src/layout/container/',
  import.meta.url,
);

const { jest } = import.meta;

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
twig.extendFilter('t', (value) => value);
twig.extendFunction(
  'include',
  createTwigIncludeFunction(
    () =>
      ({ placeholder__text }) =>
        placeholder__text,
  ),
);

const template = twig.twig({
  data: readFileSync(new URL('./container.twig', sourceDirectory), 'utf8'),
  rethrow: true,
});

function renderContainer(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('writes the section id and layout attributes on the wrapper', () => {
  const container = renderContainer({
    container__element: 'section',
    container__id: 'overview',
    container__width: 'wide',
    container__alignment: 'right',
    container__theme: 'default',
    container__theme__variation: 'dark',
    container__spacing: 'three-bottom',
    container__bg_color: true,
    container__attributes: { 'aria-label': 'Overview' },
    container__inner__attributes: { 'data-extra': 'inner' },
    container__inner__additional_classes: ['section-content'],
  });

  expect(container.tagName).toBe('SECTION');
  expect(container.id).toBe('section-overview');
  expect(container.getAttribute('aria-label')).toBe('Overview');
  expect(container.dataset).toMatchObject({
    componentTheme: 'default dark',
    componentWidth: 'wide',
    componentAlignment: 'right',
    componentSpacing: 'three-bottom',
    componentBg: 'true',
  });
  expect(
    container.querySelector('.container__inner.section-content').dataset.extra,
  ).toBe('inner');
  expect(container.querySelector('.container__intro')).toBeNull();
});

test.each([
  [{ container__theme: 'default' }, 'default light'],
  [{ container__theme__variation: 'dark' }, 'default dark'],
  [{ container__theme: 'inverse' }, 'default dark'],
  [{ container__theme: 'standard' }, 'default light'],
  [{ container__theme: 'default dark' }, 'default dark'],
  [{ container__theme: null, container__theme__variation: null }, undefined],
])('composes or inherits the theme for %j', (props, expected) => {
  const container = renderContainer(props);

  expect(container.dataset.componentTheme).toBe(expected);
  expect(container.dataset.componentWidth).toBe('content');
  expect(container.dataset.componentSpacing).toBe('one');
  expect(container.dataset.componentBg).toBeUndefined();
});

test.each([
  ['compressed', 'narrow'],
  ['compact', 'narrow'],
  ['standard', 'content'],
  ['extended', 'wide'],
  ['max', 'wide'],
  ['page', 'full'],
  [null, 'content'],
])('maps width %s to %s', (width, expected) => {
  const container = renderContainer({ container__width: width });
  expect(container.dataset.componentWidth).toBe(expected);
});

test('renders introductory content and a native link', () => {
  const container = renderContainer({
    container__overline: 'Field guide',
    container__heading: 'Start a workshop',
    container__heading_level: '3',
    container__subheading: 'A short checklist',
    container__text: '<p>Choose a time and venue.</p>',
    container__link__url: '/workshops',
    container__link__content: 'Find a workshop',
  });

  expect(container.querySelector('h3').textContent).toBe('Start a workshop');
  expect(container.querySelector('.container__text p').textContent).toBe(
    'Choose a time and venue.',
  );
  const link = container.querySelector('.container__intro a');
  expect(link.textContent).toBe('Find a workshop');
  expect(link.getAttribute('href')).toBe('/workshops');
});

test('tracks viewport state once and detaches removed containers', async () => {
  const container = renderContainer({});
  const observe = jest.fn();
  const unobserve = jest.fn();
  const once = jest
    .fn()
    .mockReturnValueOnce([container])
    .mockReturnValueOnce([]);
  once.remove = jest.fn().mockReturnValue([container]);
  let reportIntersection;
  const intersectionObserver = jest.fn((callback) => {
    reportIntersection = callback;
    return { observe, unobserve };
  });
  const originalObserver = globalThis.IntersectionObserver;

  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;
  globalThis.IntersectionObserver = intersectionObserver;

  try {
    await import('../../../src/layout/container/container.js');
    const behavior = globalThis.Drupal.behaviors.containerViewportState;

    behavior.attach(container);
    behavior.attach(document);
    expect(once).toHaveBeenCalledWith('container-viewport-state', [container]);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(container);

    reportIntersection([{ target: container, isIntersecting: true }]);
    expect(container.classList.contains('active')).toBe(true);
    expect(container.classList.contains('scrolled')).toBe(true);

    reportIntersection([{ target: container, isIntersecting: false }]);
    expect(container.classList.contains('active')).toBe(false);
    expect(container.classList.contains('scrolled')).toBe(true);

    behavior.detach(container, {}, 'unload');
    expect(unobserve).toHaveBeenCalledWith(container);
  } finally {
    delete globalThis.Drupal;
    delete globalThis.once;
    globalThis.IntersectionObserver = originalObserver;
  }
});
