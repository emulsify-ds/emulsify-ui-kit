import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const sourceDirectory = new URL(
  '../../../src/components/link-group/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const read = (path) => readFileSync(new URL(path, sourceDirectory), 'utf8');
const parse = (path, id) =>
  twig.twig({ id, data: read(path), allowInlineIncludes: true, rethrow: true });

twig.extendFilter('t', (value) => value);
twig.extendFunction('source', (path) =>
  read('../../../' + path.replace('@assets/', 'assets/')),
);
parse(
  '../../layout/container/container.twig',
  '@layout/container/container.twig',
);
const components = {
  '@components/cta/cta.twig': parse('../cta/cta.twig'),
  '@components/icon/icon.twig': parse('../icon/icon.twig'),
};
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) =>
    components[path] ? (props) => components[path].render(props) : undefined,
  ),
);
const template = parse('./link-group.twig');

function render(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders button-styled navigation links in one list without a landmark by default', () => {
  const container = render({
    link_group__nav_label: ' ',
    link_group__items: [
      { label: 'Opening hours', url: '/hours' },
      {
        label: 'Follow us',
        url: '/social',
        icon: 'linkedin',
        icon_label: 'on LinkedIn',
      },
    ],
  });

  expect(container.querySelector('nav, button')).toBeNull();
  const list = container.querySelector('ul');
  expect([...list.children].map((child) => child.tagName)).toEqual([
    'LI',
    'LI',
  ]);
  const links = list.querySelectorAll('li > a');
  expect([...links].map((link) => link.getAttribute('href'))).toEqual([
    '/hours',
    '/social',
  ]);
  expect(links[0].getAttribute('aria-label')).toBeNull();
  expect(links[1].getAttribute('aria-label')).toBe('Follow us on LinkedIn');
  expect(links[1].querySelector('svg').getAttribute('aria-hidden')).toBe(
    'true',
  );
  expect(links[1].dataset.ctaVariant).toBe('primary');
});

test('labels a navigation landmark and forwards the shared container and wrapper props', () => {
  const container = render({
    link_group__heading: 'Library visit',
    link_group__heading_level: 3,
    link_group__display: 'boxes',
    link_group__nav_label: ' Library resources ',
    link_group__width: 'wide',
    link_group__alignment: 'right',
    link_group__theme: 'default',
    link_group__theme__variation: 'dark',
    link_group__bg_color: true,
    link_group__spacing: 'half',
    link_group__id: 'visit',
    link_group__container__modifiers: ['resources'],
    link_group__blockname: 'library',
    link_group__additional_classes: ['related'],
    link_group__attributes: { class: ['resources'], 'data-test': 'links' },
    link_group__items: [
      { label: 'Opening hours', url: '/hours', icon_label: 'ignored' },
    ],
  });

  expect(container.id).toBe('section-visit');
  expect(container.matches('.container--resources')).toBe(true);
  expect(container.dataset).toMatchObject({
    componentWidth: 'wide',
    componentAlignment: 'right',
    componentTheme: 'default dark',
    componentBg: 'true',
    componentSpacing: 'half',
    linkGroupDisplay: 'boxes',
  });
  expect(container.querySelector('h3').textContent).toBe('Library visit');
  const nav = container.querySelector(
    'nav.library__link-group.link-group.related.resources',
  );
  expect(nav.getAttribute('aria-label')).toBe('Library resources');
  expect(nav.dataset.test).toBe('links');
  const link = nav.querySelector('ul > li > a');
  expect(link.dataset.ctaVariant).toBe('clean');
  expect(link.getAttribute('aria-label')).toBeNull();
  expect(link.lastElementChild.matches('svg[aria-hidden="true"]')).toBe(true);
});

test('uses supplied list items in place of the generated items', () => {
  const container = render({
    link_group__items: [{ label: 'Opening hours', url: '/hours' }],
    link_group__items_content: '<li><a href="/workshops">Workshops</a></li>',
  });

  expect(container.querySelectorAll('ul > li')).toHaveLength(1);
  expect(container.querySelector('ul > li > a').getAttribute('href')).toBe(
    '/workshops',
  );
});

test('omits empty list and navigation markup when no links have a label and destination', () => {
  expect(
    render({
      link_group__nav_label: 'Library resources',
      link_group__items: [
        { label: 'No URL', url: ' ' },
        { label: ' ', url: '/missing-label' },
      ],
    }),
  ).toBeNull();
});
