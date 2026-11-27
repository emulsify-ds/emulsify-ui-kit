import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const sourceDirectory = new URL(
  '../../../src/components/media-box/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const mediaBoxPath = '@components/media-box/media-box.twig';
const templates = new Map(
  [
    mediaBoxPath,
    '@components/image/image.twig',
    '@components/video/video.twig',
    '@layout/container/container.twig',
  ].map((path) => [
    path,
    twig.twig({
      id: path,
      data: readFileSync(
        new URL(`../../${path.slice(1)}`, sourceDirectory),
        'utf8',
      ),
      allowInlineIncludes: true,
      rethrow: true,
    }),
  ]),
);
twig.extendFilter('t', (value) => value);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) => {
    const template = templates.get(path);
    return template && ((props) => template.render(props));
  }),
);

function render(props) {
  document.body.innerHTML = templates.get(mediaBoxPath).render(props);
  return document.body.firstElementChild;
}

test('forwards section, image, and credit props', () => {
  const container = render({
    media_box__heading: 'Behind the lens',
    media_box__heading_level: 3,
    media_box__id: 'behind-the-lens',
    media_box__theme: 'default',
    media_box__theme__variation: 'dark',
    media_box__spacing: 'two-bottom',
    media_box__width: 'wide',
    media_box__bg_color: true,
    media_box__container__modifiers: ['example'],
    media_box__attributes: { class: 'extra', 'data-test': 'media' },
    media_box__image__src: '/camera.png',
    media_box__image__alt: 'A film camera on a tripod',
    media_box__image__srcset: '/camera.png 847w',
    media_box__image__sizes: '100vw',
    media_box__image__caption: 'A camera set up for a location shoot.',
    media_box__image__credit: 'Photography team',
  });

  expect(container.id).toBe('section-behind-the-lens');
  expect(container.dataset).toMatchObject({
    componentTheme: 'default dark',
    componentSpacing: 'two-bottom',
    componentWidth: 'wide',
    componentBg: 'true',
  });
  expect(container.classList.contains('container--example')).toBe(true);
  expect(container.querySelector('h3').textContent).toBe('Behind the lens');
  const media = container.querySelector('.media-box.extra');
  expect(media.dataset.test).toBe('media');
  const image = media.querySelector('figure img');
  expect(image.getAttribute('alt')).toBe('A film camera on a tripod');
  expect(image.getAttribute('srcset')).toBe('/camera.png 847w');
  expect(image.getAttribute('sizes')).toBe('100vw');
  expect(media.querySelector('figcaption').textContent).toContain(
    'A camera set up for a location shoot.',
  );
  expect(media.querySelector('.image__credit').textContent).toBe(
    'Photography team',
  );
});

test('retains the legacy image source and honors false caption and credit flags', () => {
  const container = render({
    media_box__media: '/camera.png',
    media_box__image__decorative: true,
    media_box__caption: 'Legacy caption',
    media_box__copyright: 'Legacy credit',
    media_box__show_caption: false,
    media_box__show_copyright: false,
  });

  const image = container.querySelector('img');
  expect(image.getAttribute('src')).toBe('/camera.png');
  expect(image.getAttribute('alt')).toBe('');
  expect(container.querySelector('figcaption')).toBeNull();
});

test('renders titled native video and forwards its captions track', () => {
  const container = render({
    media_box__type: 'video',
    media_box__video__title: 'A bee on a flower',
    media_box__video__sources: [{ src: '/bee.mp4', type: 'video/mp4' }],
    media_box__video__tracks: [
      { src: '/bee.vtt', kind: 'captions', srclang: 'en', default: true },
    ],
    media_box__video__caption: 'Watch the bee move across the petals.',
  });

  const video = container.querySelector('video[controls]');
  expect(video.getAttribute('aria-label')).toBe('A bee on a flower');
  expect(video.querySelector('source').getAttribute('src')).toBe('/bee.mp4');
  expect(
    video.querySelector('track[kind="captions"][default]').getAttribute('src'),
  ).toBe('/bee.vtt');
  expect(container.querySelector('figcaption').textContent).toContain(
    'Watch the bee move across the petals.',
  );
});

test('renders an embedded media content block in place of generated media', () => {
  const template = twig.twig({
    data: `{% embed '${mediaBoxPath}' with { media_box__image__src: '/camera.png' } %}
      {% block media_box__media_content %}<audio controls src="/clip.mp3"></audio>{% endblock %}
    {% endembed %}`,
    allowInlineIncludes: true,
    rethrow: true,
  });
  document.body.innerHTML = template.render({});

  expect(document.querySelector('.media-box audio[controls]')).not.toBeNull();
  expect(document.querySelector('img')).toBeNull();
});

test('omits generated media when no image or video source is available', () => {
  const container = render({ media_box__heading: 'Coming soon' });

  expect(container.querySelector('.media-box')).toBeNull();
  expect(container.querySelector('h2').textContent).toBe('Coming soon');
});
