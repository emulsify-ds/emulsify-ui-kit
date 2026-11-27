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
const readTemplate = (path) =>
  readFileSync(new URL(path, import.meta.url), 'utf8');
const parseTemplate = (path, id) =>
  twig.twig({
    id,
    data: readTemplate(path),
    allowInlineIncludes: true,
    rethrow: true,
  });

twig.extendFilter('t', (value) => value);
twig.extendFunction('source', (path) =>
  readTemplate('../../../' + path.replace('@assets/', 'assets/')),
);
parseTemplate(
  '../../layout/container/container.twig',
  '@layout/container/container.twig',
);
const components = Object.fromEntries(
  ['cta/cta', 'heading/heading', 'icon/icon', 'text/_text'].map((path) => {
    const template = parseTemplate(`../${path}.twig`);
    return [`@components/${path}.twig`, (props) => template.render(props)];
  }),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) => components[path]),
);
const template = parseTemplate('./callout.twig');

function renderCallout(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('forwards section props and keeps the heading and formatted copy', () => {
  const section = renderCallout({
    callout__heading: 'Library workshops',
    callout__heading_level: 3,
    callout__text: '<p>All materials are provided.</p>',
    callout__width: 'wide',
    callout__alignment: 'right',
    callout__theme: 'default',
    callout__theme__variation: 'dark',
    callout__spacing: 'two-bottom',
    callout__bg_color: true,
    callout__id: 'workshops',
    callout__container__modifiers: ['quiet'],
    callout__blockname: 'events',
    callout__additional_classes: ['feature'],
    callout__attributes: { class: ['panel'], 'data-test': 'workshops' },
  });

  expect(section.tagName).toBe('SECTION');
  expect(section.id).toBe('section-workshops');
  expect(section.classList.contains('container--quiet')).toBe(true);
  expect(section.dataset).toMatchObject({
    componentWidth: 'wide',
    componentAlignment: 'right',
    componentTheme: 'default dark',
    componentSpacing: 'two-bottom',
    componentBg: 'true',
  });
  const panel = section.querySelector('.callout.events__callout.feature.panel');
  expect(panel.dataset.test).toBe('workshops');
  expect(panel.querySelector('h3').textContent.trim()).toBe(
    'Library workshops',
  );
  expect(panel.querySelector('.callout__text p').textContent).toBe(
    'All materials are provided.',
  );
  expect(panel.querySelector('.callout__actions')).toBeNull();
});

test('renders at most two actions in priority order', () => {
  const section = renderCallout({
    callout__ctas: [
      {
        content: 'Find a workshop',
        url: '/workshops',
        icon: 'arrow-right',
        icon_position: 'left',
      },
      { content: 'About the makerspace', url: '/makerspace' },
      { content: 'Events calendar', url: '/events' },
    ],
  });
  const actions = [...section.querySelectorAll('.callout__actions a')];

  expect(actions.map((action) => action.getAttribute('href'))).toEqual([
    '/workshops',
    '/makerspace',
  ]);
  expect(actions.map((action) => action.dataset.ctaVariant)).toEqual([
    'primary',
    'secondary',
  ]);
  expect(actions[0].querySelector('svg')).not.toBeNull();
  expect(actions[0].firstElementChild).not.toBe(
    actions[0].querySelector('.cta__label'),
  );
});

test('skips incomplete actions and styles the first rendered one as primary', () => {
  const section = renderCallout({
    callout__heading: 'Library workshops',
    callout__heading_level: 1,
    callout__ctas: [
      { content: 'Missing a URL' },
      { content: 'Find a workshop', url: '/workshops' },
    ],
  });

  expect(section.querySelector('h2')).not.toBeNull();
  expect(section.querySelectorAll('a')).toHaveLength(1);
  expect(section.querySelector('a').dataset.ctaVariant).toBe('primary');
});
