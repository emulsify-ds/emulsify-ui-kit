import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const sourceDirectory = new URL(
  '../../../src/components/teaser/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const read = (path) => readFileSync(new URL(path, sourceDirectory), 'utf8');

twig.extendFunction('source', (path) =>
  read('../../../' + path.replace('@assets/', 'assets/')),
);
twig.extendFilter('t', (value) => value);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) => {
    const included = twig.twig({
      data: read(path.replace('@components/', '../')),
      rethrow: true,
    });
    return (props) => included.render(props);
  }),
);

const template = twig.twig({ data: read('./teaser.twig'), rethrow: true });

function renderTeaser(props) {
  document.body.innerHTML = template.render({
    teaser__heading: 'Workshop programs',
    ...props,
  });
  return document.body.firstElementChild;
}

test('uses the heading as the only link, with an unlinked image and presentational CTA labels', () => {
  const teaser = renderTeaser({
    teaser__heading_level: 2,
    teaser__id: 'workshops',
    teaser__attributes: { 'data-teaser-example': 'workshops' },
    teaser__url: '/workshops',
    teaser__image__src: '/camera.png',
    teaser__image__alt: 'A film camera',
    teaser__image__srcset: '/camera-small.png 320w, /camera.png 640w',
    teaser__ctas: [
      { content: 'See workshops', url: '/workshops', icon: 'arrow-right' },
      { content: 'Different destination', url: '/events' },
    ],
    teaser__meta: [{ label: 'Format', value: 'In person' }],
  });

  expect(teaser.id).toBe('teaser-workshops');
  expect(teaser.dataset.teaserExample).toBe('workshops');
  expect(
    teaser.querySelector('.teaser, #teaser-workshops, [data-teaser-example]'),
  ).toBeNull();
  expect(teaser.querySelectorAll('a')).toHaveLength(1);
  expect(teaser.querySelector('h2 > a').getAttribute('href')).toBe(
    '/workshops',
  );
  expect(teaser.querySelector('h2 > a').textContent).toBe('Workshop programs');
  expect(teaser.querySelector('.teaser__media img').alt).toBe('A film camera');
  expect(teaser.querySelector('.teaser__media img').srcset).toContain('640w');
  expect(teaser.querySelector('dl dt').textContent).toBe('Format');
  expect(teaser.querySelector('dl dd').textContent).toBe('In person');
  const labels = teaser.querySelectorAll('.teaser__labels > span');
  expect(labels).toHaveLength(1);
  expect(labels[0].getAttribute('aria-hidden')).toBe('true');
  expect(labels[0].textContent.trim()).toBe('See workshops');
  expect(labels[0].querySelector('svg')).not.toBeNull();
});

test('uses the first CTA destination as a fallback and limits the labels to two', () => {
  const teaser = renderTeaser({
    teaser__ctas: [
      { content: 'See workshops', url: '/workshops' },
      { content: 'Explore workshops' },
      { content: 'Third label', url: '/workshops' },
    ],
  });

  expect(teaser.querySelector('h3 a').getAttribute('href')).toBe('/workshops');
  expect(teaser.querySelectorAll('.teaser__labels > span')).toHaveLength(2);
});

test('renders a heading without a link or labels when no URL is supplied', () => {
  const teaser = renderTeaser({
    teaser__ctas: [{ content: 'See workshops' }],
    teaser__show_media: false,
    teaser__image__src: '/camera.png',
    teaser__image__alt: 'A film camera',
  });

  expect(teaser.querySelector('h3').textContent.trim()).toBe(
    'Workshop programs',
  );
  expect(teaser.querySelector('a, .teaser__media, .teaser__labels')).toBeNull();
});

test('preserves wrapper attributes and keeps DOM order when media alignment changes', () => {
  const teaser = renderTeaser({
    teaser__element: 'div',
    teaser__id: 'learn',
    teaser__layout: 'inline',
    teaser__style: 'card',
    teaser__media__alignment: 'right',
    teaser__media__shape: 'square',
    teaser__image__src: '/camera.png',
    teaser__image__decorative: true,
    teaser__attributes: { class: 'example', 'data-track': 'learning' },
    teaser__blockname: 'workshop',
  });

  expect(teaser.tagName).toBe('DIV');
  expect(teaser.id).toBe('teaser-learn');
  expect(teaser.classList.contains('example')).toBe(true);
  expect(teaser.classList.contains('workshop__teaser')).toBe(true);
  expect(teaser.dataset.track).toBe('learning');
  expect(teaser.dataset.teaserLayout).toBe('inline');
  expect(teaser.dataset.teaserStyle).toBe('card');
  expect(teaser.dataset.teaserMediaAlignment).toBe('right');
  expect(teaser.dataset.teaserMediaShape).toBe('square');
  const inner = teaser.querySelector('.teaser__inner');
  expect(inner.firstElementChild.className).toBe('teaser__media');
  expect(teaser.querySelector('img').getAttribute('alt')).toBe('');
  expect(inner.lastElementChild.className).toBe('teaser__content');
});

test('accepts composed media and summary slots', () => {
  const teaser = renderTeaser({
    teaser__image__src: '/camera.png',
    teaser__image__alt: 'A film camera',
    teaser__media_content: '<img src="/illustration.svg" alt="">',
    teaser__summary_content: '<p>Explore <em>creative</em> classes.</p>',
  });

  expect(teaser.querySelector('img').getAttribute('src')).toBe(
    '/illustration.svg',
  );
  expect(teaser.querySelector('em').textContent).toBe('creative');
});
