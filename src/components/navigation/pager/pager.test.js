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
  data: readFileSync(new URL('./pager.twig', import.meta.url), 'utf8'),
  rethrow: true,
});

function renderPager(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders the current page and named controls in navigation order', () => {
  const nav = renderPager({
    pager__current: 8,
    pager__items: {
      first: { href: '?page=0' },
      previous: { href: '?page=6' },
      pages: {
        7: { href: '?page=6' },
        8: { href: '?page=7' },
        9: { href: '?page=8' },
      },
      next: { href: '?page=8' },
      last: { href: '?page=19' },
    },
    pager__ellipses: { previous: true, next: true },
  });
  expect(nav.matches('nav[aria-label="Pagination"]')).toBe(true);
  expect(nav.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  expect(nav.querySelector('span[aria-current="page"]').textContent).toBe(
    'Page 8',
  );
  expect(
    [...nav.querySelectorAll('a .visually-hidden')].map((label) =>
      label.textContent.trim(),
    ),
  ).toEqual([
    'First page',
    'Previous page',
    'Page',
    'Page',
    'Next page',
    'Last page',
  ]);
  expect(nav.querySelector('a[rel="next"]').getAttribute('href')).toBe(
    '?page=8',
  );
  expect(nav.querySelectorAll('li.pager__item--ellipsis')).toHaveLength(2);
});

test('renders a Drupal mini pager and omits an empty pager', () => {
  expect(renderPager({ pager__items: {} })).toBeNull();
  const nav = renderPager({
    items: {
      current: 2,
      previous: { href: '?page=0' },
      next: { href: '?page=2' },
    },
    pager__label: 'Search results',
  });
  expect(nav.getAttribute('aria-label')).toBe('Search results');
  expect(nav.querySelector('[aria-current="page"]').textContent).toBe('Page 2');
  expect(nav.querySelectorAll('a')).toHaveLength(2);
});
