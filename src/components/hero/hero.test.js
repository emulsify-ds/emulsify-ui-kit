import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
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
const includes = Object.fromEntries(
  [
    'cta/cta',
    'heading/heading',
    'icon/icon',
    'image/image',
    'text/_text',
    'video/video',
  ].map((path) => {
    const template = parse(`../${path}.twig`);
    return [`@components/${path}.twig`, (props) => template.render(props)];
  }),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) => includes[path]),
);
const template = parse('./hero.twig');

function render(props) {
  document.body.innerHTML = template.render({
    hero__heading: 'Make something new',
    ...props,
  });
  return document.body.firstElementChild;
}

test('passes shared Container props and renders a labelled section', () => {
  const section = render({
    hero__heading_level: 2,
    hero__id: 'studio',
    hero__width: 'narrow',
    hero__theme: 'default',
    hero__theme__variation: 'dark',
    hero__bg_color: false,
    hero__spacing: 'four',
    hero__container__modifiers: ['feature'],
    hero__attributes: { class: 'studio-hero' },
    hero__text: '<p>Tour the studio and start your next project.</p>',
  });
  const heading = section.querySelector('h2');
  expect(section.tagName).toBe('SECTION');
  expect(section.id).toBe('section-studio');
  expect(section.getAttribute('aria-labelledby')).toBe(heading.id);
  expect(section.classList.contains('container--feature')).toBe(true);
  expect(section.dataset).toMatchObject({
    componentWidth: 'narrow',
    componentTheme: 'default dark',
    componentSpacing: 'four',
  });
  expect(section.hasAttribute('data-component-bg')).toBe(false);
  expect(heading.textContent.trim()).toBe('Make something new');
  expect(heading.dataset.headingStyle).toBe('display');
  expect(section.querySelector('.studio-hero .hero__text p').textContent).toBe(
    'Tour the studio and start your next project.',
  );
});

test('limits CTA links to two and forwards icon placement', () => {
  const section = render({
    hero__ctas: [
      {
        content: 'Explore workshops',
        url: '/workshops',
        icon: 'arrow-right',
        icon_position: 'left',
      },
      { content: 'Plan a visit', url: '/visit' },
      { content: 'Browse classes', url: '/classes' },
    ],
  });
  const links = [...section.querySelectorAll('.hero__actions a')];
  expect(links.map((link) => link.getAttribute('href'))).toEqual([
    '/workshops',
    '/visit',
  ]);
  expect(links.map((link) => link.dataset.ctaVariant)).toEqual([
    'primary',
    'secondary',
  ]);
  expect(links[0].firstElementChild.tagName).toBe('svg');
});

test('keeps media after the copy and forwards image candidates and alternative text', () => {
  const section = render({
    hero__media_alignment: 'left',
    hero__height: 'tall',
    hero__image__src: '/workshop.jpg',
    hero__image__srcset: '/workshop.jpg 640w',
    hero__image__sizes: '(max-width: 767px) 100vw, 50vw',
  });
  const panel = section.querySelector('.hero');
  expect(panel.dataset).toMatchObject({
    heroMediaAlignment: 'left',
    heroHeight: 'tall',
  });
  expect(panel.firstElementChild.classList.contains('hero__content')).toBe(
    true,
  );
  const image = panel.querySelector('.hero__media img');
  expect(image.alt).toBe('');
  expect(image.getAttribute('alt')).toBe('');
  expect(image.srcset).toBe('/workshop.jpg 640w');
  expect(image.getAttribute('loading')).toBe('eager');

  const informative = render({
    hero__image__src: '/workshop.jpg',
    hero__image__alt: 'A workbench beside a wall of tools',
  });
  expect(informative.querySelector('img').alt).toBe(
    'A workbench beside a wall of tools',
  );
});

test('supports composed media or a copy-only section', () => {
  const composed = render({
    hero__image__src: '/workshop.jpg',
    hero__media_content: '<p class="custom-media">Studio floor plan</p>',
  });
  expect(composed.querySelector('.hero__media .custom-media')).not.toBeNull();
  expect(composed.querySelector('img')).toBeNull();

  const copyOnly = render({
    hero__media_type: 'none',
    hero__image__src: '/workshop.jpg',
  });
  expect(copyOnly.querySelector('h1')).not.toBeNull();
  expect(copyOnly.querySelector('.hero__media')).toBeNull();
});

test('allows enhanced background playback without a native autoplay attribute', () => {
  const section = render({
    hero__media_type: 'video',
    hero__video__background: true,
    hero__video__sources: [{ src: '/ambient.mp4', type: 'video/mp4' }],
    hero__video__poster: '/ambient.jpg',
  });
  const player = section.querySelector('[data-video-autoplay="true"]');
  const video = player.querySelector('video');
  expect(player.dataset.videoDecorative).toBe('true');
  expect(video.hasAttribute('autoplay')).toBe(false);
  expect(video.hasAttribute('muted')).toBe(true);
  expect(video.loop).toBe(true);
  expect(video.controls).toBe(true);
  expect(video.poster).toMatch(/\/ambient\.jpg$/);
  expect(player.querySelector('button').dataset.videoPauseLabel).toBe(
    'Pause video',
  );
});

test('keeps informative video paused with native controls and forwards text tracks', () => {
  const section = render({
    hero__media_type: 'video',
    hero__video__title: 'Tour the studio',
    hero__video__sources: [{ src: '/tour.mp4' }],
    hero__video__tracks: [{ src: '/tour-captions.vtt', srclang: 'en' }],
  });
  const video = section.querySelector('video');
  expect(video.getAttribute('aria-label')).toBe('Tour the studio');
  expect(video.querySelector('track').getAttribute('src')).toBe(
    '/tour-captions.vtt',
  );
  expect(video.controls).toBe(true);
  expect(section.querySelector('[data-video-autoplay="true"]')).toBeNull();
});
