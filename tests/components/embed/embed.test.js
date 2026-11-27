import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const sourceDirectory = new URL(
  '../../../src/components/embed/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const loadTemplate = (file, id) =>
  twig.twig({
    id,
    data: readFileSync(new URL(file, sourceDirectory), 'utf8'),
    allowInlineIncludes: true,
    rethrow: true,
  });

loadTemplate(
  '../../layout/container/container.twig',
  '@layout/container/container.twig',
);
const template = loadTemplate('./embed.twig', '@components/embed/embed.twig');

function renderEmbed(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders the titled iframe with native loading and a semantic caption', () => {
  const section = renderEmbed({
    embed__src: 'https://example.com/map',
    embed__title: '  Library entrances "map"  ',
    embed__heading: 'Find the library',
    embed__heading_level: 3,
    embed__caption: 'The entrance faces the main street.',
    embed__width: 'wide',
    embed__theme: 'default',
    embed__theme__variation: 'dark',
    embed__bg_color: true,
    embed__spacing: 'two',
    embed__id: 'library',
    embed__container__modifiers: ['map'],
  });
  const iframe = section.querySelector('figure iframe');
  expect(iframe.title).toBe('Library entrances "map"');
  expect(iframe.getAttribute('loading')).toBe('lazy');
  expect(iframe.getAttribute('src')).toBe('https://example.com/map');
  expect(section.querySelector('figcaption').textContent.trim()).toBe(
    'The entrance faces the main street.',
  );
  expect(section.querySelector('h3').textContent).toBe('Find the library');
  expect(section.id).toBe('section-library');
  expect(section.dataset).toMatchObject({
    componentWidth: 'wide',
    componentTheme: 'default dark',
    componentBg: 'true',
    componentSpacing: 'two',
  });
  expect(section.classList.contains('container--map')).toBe(true);
});

test('omits generated media when URL or title is missing or the URL uses an unsupported scheme', () => {
  expect(renderEmbed({ embed__src: '/map' })).toBeNull();
  expect(renderEmbed({ embed__title: 'Map' })).toBeNull();
  expect(renderEmbed({ embed__src: '/map', embed__title: '  ' })).toBeNull();
  expect(
    renderEmbed({ embed__src: 'data:text/html,Map', embed__title: 'Map' }),
  ).toBeNull();
});

test('accepts composed markup with titled frames and gives the slot priority', () => {
  const section = renderEmbed({
    embed__iframe: '<iframe src="/map" title=Map></iframe>',
    embed__src: '/tour',
    embed__title: 'Tour',
  });
  expect(section.querySelector('iframe').title).toBe('Map');
  expect(section.querySelector('figure, .container__intro')).toBeNull();

  const composed = twig.twig({
    data: `{% embed '@components/embed/embed.twig' with {
      embed__src: '/tour',
      embed__title: 'Tour',
    } only %}
      {% block embed__content %}
        <iframe src="/map" title='Map > Library'></iframe>
      {% endblock %}
    {% endembed %}`,
    allowInlineIncludes: true,
    rethrow: true,
  });
  document.body.innerHTML = composed.render({});
  expect(document.querySelector('iframe').title).toBe('Map > Library');
  expect(document.querySelector('iframe').getAttribute('src')).toBe('/map');
});

test.each([
  '<iframe src="/map"></iframe>',
  '<iframe src="/map" title=""></iframe>',
  '<iframe src="/map" title="  "></iframe>',
  '<iframe src="/map" data-title="Map"></iframe>',
  '<iframe src="/map" data-options=" title=Map "></iframe>',
  '<iframe src="/map" title=" " title="Map"></iframe>',
  '<iframe src="/map" title="Map"></iframe><iframe src="/tour"></iframe>',
])('omits an embed fragment that contains an untitled iframe', (markup) => {
  expect(renderEmbed({ embed__iframe: markup })).toBeNull();
  expect(renderEmbed({ embed__content: markup })).toBeNull();
});

test('sets custom aspect ratios only for positive numbers', () => {
  const props = {
    embed__src: '/map',
    embed__title: 'Map',
    embed__ratio: 'custom',
  };
  const valid = renderEmbed({ ...props, embed__ratio_custom: '21 / 9' });
  expect(
    valid
      .querySelector('.embed__media')
      .style.getPropertyValue('--embed-aspect-ratio'),
  ).toBe('21 / 9');

  for (const ratio of ['1 / 0', '0', '16 / 9; display: none']) {
    const invalid = renderEmbed({ ...props, embed__ratio_custom: ratio });
    expect(invalid.querySelector('.embed__media').style.length).toBe(0);
  }
});
