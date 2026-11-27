import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const require = createRequire(import.meta.url);
const coreRequire = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(coreRequire('twig').factory());
const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
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
  '@components/heading/heading.twig': parse('../heading/heading.twig'),
  '@components/cta/cta.twig': parse('../cta/cta.twig'),
  '@components/icon/icon.twig': parse('../icon/icon.twig'),
};
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) =>
    components[path] ? (props) => components[path].render(props) : undefined,
  ),
);
const template = parse('./page-title.twig');

function render(props = {}) {
  document.body.innerHTML = template.render({
    page_title__heading: 'Film collection',
    ...props,
  });
  return document.body.firstElementChild;
}

test('renders the page heading as the only h1 and omits empty regions', () => {
  const container = render({
    page_title__heading: 'History of <b>film</b>',
    page_title__overline: 'Collections',
    page_title__subheading: 'Film through the decades.',
    page_title__description_content: ' ',
    page_title__media_content: null,
  });

  expect(container.querySelectorAll('h1')).toHaveLength(1);
  expect(container.querySelector('h1').textContent).toBe(
    'History of <b>film</b>',
  );
  expect(container.querySelector('h1 b')).toBeNull();
  expect(
    container.querySelector('p.page-title__overline').textContent.trim(),
  ).toBe('Collections');
  expect(
    container.querySelector(
      '.page-title__breadcrumbs, .page-title__description, .page-title__media, .page-title__actions',
    ),
  ).toBeNull();
});

test('supports breadcrumbs and media slots with the shared Container controls', () => {
  const container = render({
    page_title__breadcrumbs_content:
      '<nav aria-label="Breadcrumb"><ol><li aria-current="page">Film collection</li></ol></nav>',
    page_title__description_content: '<p>Browse by decade.</p>',
    page_title__media_content:
      '<img src="/camera.png" alt="A camera on a tripod">',
    page_title__media_alignment: 'left',
    page_title__layout: 'inline',
    page_title__width: 'narrow',
    page_title__alignment: 'right',
    page_title__theme: 'default',
    page_title__theme__variation: 'dark',
    page_title__bg_color: true,
    page_title__spacing: 'half',
    page_title__id: 'film',
    page_title__container__modifiers: ['collection'],
    page_title__blockname: 'library',
    page_title__additional_classes: ['feature'],
    page_title__attributes: { class: 'custom', 'data-source': 'collection' },
  });

  expect(container.id).toBe('section-film');
  expect(container.classList.contains('container--collection')).toBe(true);
  expect(container.dataset).toMatchObject({
    componentWidth: 'narrow',
    componentAlignment: 'right',
    componentTheme: 'default dark',
    componentBg: 'true',
    componentSpacing: 'half',
  });
  const title = container.querySelector('.library__page-title.page-title');
  expect(title.matches('.feature.custom')).toBe(true);
  expect(title.dataset).toMatchObject({
    source: 'collection',
    pageTitleLayout: 'inline',
    mediaAlignment: 'left',
  });
  expect(
    title.firstElementChild.querySelector('nav').getAttribute('aria-label'),
  ).toBe('Breadcrumb');
  expect(title.querySelector('.page-title__description p').textContent).toBe(
    'Browse by decade.',
  );
  expect(title.querySelector('.page-title__media img').alt).toBe(
    'A camera on a tripod',
  );
});

test('renders up to two CTA links and a separately linked overline', () => {
  const container = render({
    page_title__overline: 'Collections',
    page_title__overline__url: '/collections',
    page_title__ctas: [
      {
        content: 'Browse titles',
        url: '/titles',
        icon: 'arrow-right',
        icon_position: 'left',
      },
      { content: 'Plan a visit', url: '/visit' },
      { content: 'More', url: '/more' },
    ],
  });

  const overline = container.querySelector('.page-title__overline a');
  expect(overline.getAttribute('href')).toBe('/collections');
  expect(overline.dataset.ctaVariant).toBe('link');
  const actions = container.querySelectorAll('.page-title__actions > a');
  expect([...actions].map((link) => link.getAttribute('href'))).toEqual([
    '/titles',
    '/visit',
  ]);
  expect([...actions].map((link) => link.dataset.ctaVariant)).toEqual([
    'primary',
    'secondary',
  ]);
  expect(actions[0].firstElementChild.matches('svg[aria-hidden="true"]')).toBe(
    true,
  );
});
