import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const sourceDirectory = new URL(
  '../../../src/components/banner/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const read = (path) => readFileSync(new URL(path, sourceDirectory), 'utf8');
const loadTemplate = (path, id) =>
  twig.twig({
    id,
    data: read(path),
    allowInlineIncludes: true,
    rethrow: true,
  });

twig.extendFilter('t', (value) => value);
twig.extendFunction('source', (path) =>
  read('../../../' + path.replace('@assets/', 'assets/')),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction(
    (path) => (props) => twig.twig({ ref: path }).render(props),
  ),
);
loadTemplate(
  '../../layout/container/container.twig',
  '@layout/container/container.twig',
);
for (const path of [
  'cta/cta',
  'heading/heading',
  'icon/icon',
  'image/image',
  'text/_text',
  'video/video',
]) {
  loadTemplate(`../${path}.twig`, `@components/${path}.twig`);
}
const template = loadTemplate('./banner.twig');

function renderBanner(props) {
  document.body.innerHTML = template.render({
    banner__heading: 'Library workshops',
    ...props,
  });
  return document.body.firstElementChild;
}

test('derives stable section and heading IDs from the section anchor suffix', () => {
  const props = {
    banner__id: 'library-workshops',
    banner__heading_level: 3,
    banner__theme: 'default',
    banner__theme__variation: 'dark',
    banner__bg_color: false,
    banner__width: 'full',
    banner__spacing: 'two',
    banner__container__modifiers: ['programs'],
  };
  const section = renderBanner(props);
  const heading = section.querySelector('h3');
  expect(section.tagName).toBe('SECTION');
  expect(section.id).toBe('section-library-workshops');
  expect(heading.id).toBe('banner-heading-library-workshops');
  expect(section.getAttribute('aria-labelledby')).toBe(heading.id);
  expect(section.classList.contains('container--programs')).toBe(true);
  expect(section.dataset).toMatchObject({
    componentWidth: 'full',
    componentTheme: 'default dark',
    componentSpacing: 'two',
  });
  expect(section.dataset.componentBg).toBeUndefined();
  expect(renderBanner(props).querySelector('h3').id).toBe(heading.id);
});

test('omits generated IDs when no anchor suffix is supplied', () => {
  const section = renderBanner({});
  expect(section.querySelector('h2').id).toBe('');
  expect(section.hasAttribute('aria-labelledby')).toBe(false);
  expect(section.querySelector('.banner__media')).toBeNull();
});

test('renders up to two shared CTA links with the supplied icon', () => {
  const section = renderBanner({
    banner__ctas: [
      {
        content: 'Browse workshops',
        url: '/workshops',
        icon: 'arrow-right',
        icon_position: 'left',
      },
      { content: 'See library hours', url: '/hours' },
      { content: 'Find a library', url: '/locations' },
    ],
  });
  const actions = [...section.querySelectorAll('a.cta')];

  expect(actions.map((action) => action.getAttribute('href'))).toEqual([
    '/workshops',
    '/hours',
  ]);
  expect(actions.map((action) => action.dataset.ctaVariant)).toEqual([
    'primary',
    'secondary',
  ]);
  expect(actions[0].firstElementChild.tagName.toLowerCase()).toBe('svg');
});

test('places copy before responsive media and supports alt text', () => {
  const section = renderBanner({
    banner__image__src: '/workshop.jpg',
    banner__image__alt: 'A camera on a tripod',
    banner__image__srcset: '/workshop.jpg 847w',
    banner__image__sizes: '66vw',
    banner__media_alignment: 'left',
  });
  const banner = section.querySelector('.banner');

  expect(banner.dataset.bannerMediaAlignment).toBe('left');
  expect(banner.firstElementChild.className).toBe('banner__content');
  const image = banner.querySelector('img');
  expect(image.alt).toBe('A camera on a tripod');
  expect(image.srcset).toBe('/workshop.jpg 847w');
  expect(image.sizes).toBe('66vw');
});

test('renders titled video with captions and manual playback ahead of the image', () => {
  const section = renderBanner({
    banner__image__src: '/workshop.jpg',
    banner__image__decorative: true,
    banner__video__title: 'A tour of the workshop',
    banner__video__sources: [{ src: '/tour.mp4' }],
    banner__video__tracks: [
      {
        src: '/captions.vtt',
        kind: 'captions',
        srclang: 'en',
        label: 'English',
      },
    ],
  });
  const video = section.querySelector('video');

  expect(video.getAttribute('aria-label')).toBe('A tour of the workshop');
  expect(video.controls).toBe(true);
  expect(video.autoplay).toBe(false);
  expect(video.querySelector('track').kind).toBe('captions');
  expect(section.querySelector('img')).toBeNull();
});

test('pairs custom media and caption slots in a figure', () => {
  const section = renderBanner({
    banner__video__sources: [{ src: '/tour.mp4' }],
    banner__media_content: '<img src="/equipment.jpg" alt="Studio equipment">',
    banner__media_caption_content: 'Equipment in the library studio.',
  });
  const figure = section.querySelector('figure.banner__media');

  expect(figure.querySelector('img').alt).toBe('Studio equipment');
  expect(figure.querySelector('figcaption').textContent.trim()).toBe(
    'Equipment in the library studio.',
  );
  expect(figure.querySelector('video')).toBeNull();
});
