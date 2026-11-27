import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const { jest } = import.meta;
const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const readTemplate = (path) =>
  readFileSync(new URL(path, import.meta.url), 'utf8');
const parseTemplate = (path) =>
  twig.twig({ data: readTemplate(path), rethrow: true });

twig.extendFilter('t', (message) => message);
twig.extendFunction('source', (path) =>
  readTemplate('../../../' + path.replace('@assets/', 'assets/')),
);
const components = Object.fromEntries(
  ['cta', 'heading', 'icon'].map((name) => {
    const path = `${name}/${name}.twig`;
    const component = parseTemplate('../' + path);
    return [`@components/${path}`, (props) => component.render(props)];
  }),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((path) => components[path]),
);
const template = parseTemplate('./announcement.twig');

function renderAnnouncement(props) {
  document.body.insertAdjacentHTML(
    'beforeend',
    template.render({
      announcement__heading: 'Library hours are changing',
      announcement__content: 'The library will close at 6 p.m.',
      ...props,
    }),
  );
  return document.body.lastElementChild;
}

beforeEach(() => {
  document.body.replaceChildren();
});

test('renders a heading, readable text, a decorative icon, and CTA links', () => {
  const announcement = renderAnnouncement({
    announcement__heading_level: 2,
    announcement__icon: 'circle-info',
    announcement__content: 'Hours < 12/day',
    announcement__variant: 'tint',
    announcement__blockname: 'library',
    announcement__additional_classes: ['notice'],
    announcement__attributes: { class: ['seasonal'], 'data-example': 'hours' },
    announcement__ctas: [
      { content: 'Check opening hours', url: '/library/hours' },
      { content: 'Contact the library', url: '/library/contact' },
      { content: 'Browse workshops', url: '/library/workshops' },
    ],
  });

  expect(announcement.querySelector('h2').textContent.trim()).toBe(
    'Library hours are changing',
  );
  expect(announcement.querySelector('p').textContent).toBe('Hours < 12/day');
  expect(announcement.querySelector('svg').getAttribute('aria-hidden')).toBe(
    'true',
  );
  expect(
    announcement.matches('.announcement.library__announcement.notice.seasonal'),
  ).toBe(true);
  expect(announcement.dataset.announcementVariant).toBe('tint');
  expect(
    announcement.querySelector('[data-example], .announcement'),
  ).toBeNull();
  const links = [...announcement.querySelectorAll('a')];
  expect(links.map((link) => link.getAttribute('href'))).toEqual([
    '/library/hours',
    '/library/contact',
  ]);
  expect(links.map((link) => link.dataset.ctaVariant)).toEqual([
    'primary',
    'secondary',
  ]);
  expect(announcement.querySelector('button')).toBeNull();
});

test('omits incomplete actions and uses the default heading level', () => {
  const announcement = renderAnnouncement({
    announcement__heading_level: 9,
    announcement__ctas: [{ content: 'Missing a destination' }],
  });

  expect(announcement.querySelector('h4')).not.toBeNull();
  expect(announcement.querySelector('.announcement__actions')).toBeNull();
});

describe('announcement dismissal', () => {
  beforeAll(async () => {
    const seen = new WeakSet();
    globalThis.once = (id, buttons) =>
      buttons.filter((button) => {
        if (seen.has(button)) return false;
        seen.add(button);
        return true;
      });
    globalThis.Drupal = { behaviors: {} };
    await import('./announcement.js');
  });

  afterAll(() => {
    delete globalThis.once;
    delete globalThis.Drupal;
  });

  test('reveals the named native button once and dismisses only its notice', () => {
    const announcement = renderAnnouncement({
      announcement__dismissible: true,
    });
    const another = renderAnnouncement({ announcement__dismissible: true });
    const button = announcement.querySelector('button');
    const addEventListener = jest.spyOn(button, 'addEventListener');
    const behavior = Drupal.behaviors.emulsifyAnnouncement;

    expect(button.type).toBe('button');
    expect(button.textContent.trim()).toBe('Dismiss announcement');
    expect(button.hidden).toBe(true);
    expect(announcement.hidden).toBe(false);

    behavior.attach(button);
    behavior.attach(document);

    expect(addEventListener).toHaveBeenCalledTimes(1);
    expect(button.hidden).toBe(false);
    button.click();
    expect(announcement.hidden).toBe(true);
    expect(another.hidden).toBe(false);
  });
});
