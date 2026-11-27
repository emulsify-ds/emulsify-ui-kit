import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const sourceDirectory = new URL(
  '../../../../src/components/navigation/social/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const read = (path) => readFileSync(new URL(path, sourceDirectory), 'utf8');
const parse = (path) => twig.twig({ data: read(path), rethrow: true });

twig.extendFilter('t', (value) => value);
twig.extendFunction('source', (path) => {
  const file = new URL(
    '../../../../' + path.replace('@assets/', 'assets/'),
    sourceDirectory,
  );
  return existsSync(file) ? readFileSync(file, 'utf8') : '';
});
const components = {
  '@components/navigation/social/_social-item.twig': parse(
    './_social-item.twig',
  ),
  '@components/icon/icon.twig': parse('../../icon/icon.twig'),
};
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) =>
    components[path] ? (props) => components[path].render(props) : undefined,
  ),
);
const template = parse('./social.twig');

function render(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders native links with visually hidden names and decorative icons', () => {
  const nav = render({
    social__label: 'Library profiles',
    social__modifiers: ['footer'],
    social__items: [
      { title: 'Photo gallery', icon: 'instagram', url: '/photos' },
    ],
  });
  const link = nav.querySelector('li a');

  expect(nav.tagName).toBe('NAV');
  expect(nav.getAttribute('aria-label')).toBe('Library profiles');
  expect(nav.classList.contains('social-nav--footer')).toBe(true);
  expect(link.getAttribute('href')).toBe('/photos');
  expect(link.querySelector('.visually-hidden').textContent.trim()).toBe(
    'Photo gallery',
  );
  expect(link.querySelector('svg').getAttribute('aria-hidden')).toBe('true');
  expect(link.querySelector('svg').getAttribute('focusable')).toBe('false');
});

test('keeps the name visible when an icon is unavailable and accepts legacy items', () => {
  const nav = render({
    items: [{ text: 'Community forum', href: '/forum', icon: 'not-found' }],
  });

  expect(nav.querySelector('a').textContent.trim()).toBe('Community forum');
  expect(nav.querySelector('a .visually-hidden')).toBeNull();
});

test('omits unnamed links and an empty navigation landmark', () => {
  expect(
    render({ social__items: [{ url: '/photos', icon: 'instagram' }] }),
  ).toBeNull();
});
