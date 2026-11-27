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
twig.extendFilter('t', (text) => text);
twig.extendFunction(
  'include',
  createTwigIncludeFunction(
    (path) => (props) => twig.twig({ ref: path }).render(props),
  ),
);

function loadTemplate(file, id) {
  return twig.twig({
    id,
    data: readFileSync(new URL(file, import.meta.url), 'utf8'),
    allowInlineIncludes: true,
    rethrow: true,
  });
}

loadTemplate(
  '../../layout/container/container.twig',
  '@layout/container/container.twig',
);
for (const path of [
  'heading/heading.twig',
  'text/_text.twig',
  'image/image.twig',
  'cta/cta.twig',
]) {
  loadTemplate(`../${path}`, `@components/${path}`);
}
const template = loadTemplate('./text-with-image.twig');

function render(props) {
  document.body.innerHTML = template.render({
    text_with_image__heading: 'Film an interview',
    text_with_image__text: '<p>Practice with a camera.</p>',
    text_with_image__image__src: '/camera.png',
    text_with_image__image__alt: 'Video camera on a tripod',
    ...props,
  });
  return document.body.firstElementChild;
}

test.each(['left', 'right'])(
  'keeps the copy before the media with %s placement',
  (alignment) => {
    const section = render({
      text_with_image__media_alignment: alignment,
      text_with_image__focus: 'image',
      text_with_image__heading_level: 3,
      text_with_image__image__caption: 'A location shoot',
    });
    const component = section.querySelector('.text-with-image');
    const [copy, media] = component.children;

    expect(component.dataset).toMatchObject({
      mediaAlignment: alignment,
      componentFocus: 'image',
    });
    expect(copy.querySelector('h3').textContent).toBe('Film an interview');
    expect(copy.querySelector('p').textContent).toBe('Practice with a camera.');
    expect(media.querySelector('img').alt).toBe('Video camera on a tripod');
    expect(media.querySelector('figcaption').textContent.trim()).toBe(
      'A location shoot',
    );
  },
);

test('forwards section settings and renders up to two links', () => {
  const section = render({
    text_with_image__width: 'wide',
    text_with_image__theme: 'default',
    text_with_image__theme__variation: 'dark',
    text_with_image__bg_color: true,
    text_with_image__spacing: 'two',
    text_with_image__id: 'workshop',
    text_with_image__container__modifiers: ['feature'],
    text_with_image__ctas: [
      { content: 'View workshop dates', url: '/workshop' },
      { content: 'Read the guide', url: '/guide' },
      { content: 'Browse courses', url: '/courses' },
    ],
  });
  expect(section.id).toBe('section-workshop');
  expect(section.classList.contains('container--feature')).toBe(true);
  expect(section.dataset).toMatchObject({
    componentWidth: 'wide',
    componentTheme: 'default dark',
    componentBg: 'true',
    componentSpacing: 'two',
  });
  const actions = [...section.querySelectorAll('a.cta')];
  expect(actions.map((action) => action.getAttribute('href'))).toEqual([
    '/workshop',
    '/guide',
  ]);
  expect(actions.map((action) => action.dataset.ctaVariant)).toEqual([
    'primary',
    'secondary',
  ]);
});

test('renders composed media in place of the image', () => {
  const section = render({
    text_with_image__media_content:
      '<video controls src="/interview.mp4"></video>',
  });

  expect(section.querySelector('.text-with-image__media video').controls).toBe(
    true,
  );
  expect(section.querySelector('img')).toBeNull();
});

test('omits the media wrapper when the image has no alternative text', () => {
  const section = render({ text_with_image__image__alt: '' });

  expect(section.querySelector('.text-with-image__media')).toBeNull();
});
