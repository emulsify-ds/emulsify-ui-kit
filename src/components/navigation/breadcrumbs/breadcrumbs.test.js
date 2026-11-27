import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
twig.extendFilter('t', (message) => message);

const template = twig.twig({
  data: readFileSync(new URL('./breadcrumbs.twig', import.meta.url), 'utf8'),
  rethrow: true,
});

function renderBreadcrumbs(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders an ordered, labelled trail with one current page', () => {
  const nav = renderBreadcrumbs({
    breadcrumbs__items: [
      { url: '/', text: 'Home' },
      { url: '/events', text: 'Events' },
      { url: '/events/workshops', text: 'Workshops' },
    ],
  });
  expect(nav.matches('nav[aria-label="Breadcrumb"]')).toBe(true);
  expect(nav.querySelectorAll('ol > li')).toHaveLength(3);
  expect(
    [...nav.querySelectorAll('a')].map((link) => link.getAttribute('href')),
  ).toEqual(['/', '/events']);
  expect(
    nav.querySelector('li:last-child [aria-current="page"]').textContent,
  ).toBe('Workshops');
  expect(nav.querySelectorAll('[aria-current]')).toHaveLength(1);
  expect(
    nav.querySelector('.breadcrumbs__separator').getAttribute('aria-hidden'),
  ).toBe('true');
});

test('supports Drupal breadcrumb input and omits an empty trail', () => {
  expect(renderBreadcrumbs({ breadcrumbs__items: [] })).toBeNull();
  const nav = renderBreadcrumbs({
    breadcrumb: [{ title: 'Home', href: '/' }, { text: 'Library' }],
    breadcrumbs__label: 'Site breadcrumb',
    breadcrumbs__attributes: { class: ['example'], id: 'trail' },
  });
  expect(
    nav.matches('nav.breadcrumbs.example#trail[aria-label="Site breadcrumb"]'),
  ).toBe(true);
  expect(nav.querySelector('a').textContent).toBe('Home');
  expect(nav.querySelector('[aria-current]').textContent).toBe('Library');
});
