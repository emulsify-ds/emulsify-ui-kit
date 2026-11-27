import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';
import once from '../../../node_modules/@drupal/once/src/once.js';

const sourceDirectory = new URL(
  '../../../src/components/status/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const readTemplate = (path) =>
  readFileSync(new URL(path, sourceDirectory), 'utf8');
const parseTemplate = (path) =>
  twig.twig({ data: readTemplate(path), rethrow: true });

twig.extendFilter('t', (message) => message);
twig.extendFunction('source', (path) =>
  readTemplate('../../../' + path.replace('@assets/', 'assets/')),
);
const components = Object.fromEntries(
  ['cta', 'icon'].map((name) => {
    const file = `${name}/${name}.twig`;
    const component = parseTemplate('../' + file);
    return ['@components/' + file, (props) => component.render(props)];
  }),
);
twig.extendFunction(
  'include',
  createTwigIncludeFunction((name) => components[name]),
);
const template = parseTemplate('./status.twig');

function renderStatus(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders visible labels and the correct live-region roles', () => {
  const status = renderStatus({
    status__messages: {
      info: ['Open Sat.'],
      status: ['Your reservation was confirmed.', 'Check your email.'],
      warning: ['Your reservation expires soon.'],
      danger: ['The reservation failed.'],
      empty: [],
    },
    status__labels: { status: 'Confirmed' },
  });
  const groups = [...status.querySelectorAll('.status__message')];

  expect(
    groups.map((group) => [
      group.dataset.statusType,
      group.querySelector('.status__content').getAttribute('role'),
      group.querySelector('.status__label').textContent.trim(),
    ]),
  ).toEqual([
    ['info', 'status', 'Information'],
    ['success', 'status', 'Confirmed'],
    ['warning', 'alert', 'Warning'],
    ['error', 'alert', 'Error'],
  ]);
  expect(groups[1].querySelectorAll('li')).toHaveLength(2);
  expect(
    groups.every((group) => group.querySelector('svg[aria-hidden="true"]')),
  ).toBe(true);
  expect(status.querySelector('button')).toBeNull();
});

test('omits the wrapper for empty groups and scopes wrapper attributes to the root', () => {
  expect(renderStatus({ status__messages: { info: [] } })).toBeNull();
  const status = renderStatus({
    status__messages: { info: ['Open Sat.'] },
    status__attributes: { id: 'opening-hours', class: 'schedule' },
    status__blockname: 'library',
  });
  expect(status.matches('#opening-hours.status.schedule.library__status')).toBe(
    true,
  );
  expect(status.querySelector('#opening-hours, .schedule')).toBeNull();
});

test('enhances native dismiss buttons once and moves focus as messages are dismissed', async () => {
  globalThis.Drupal = { behaviors: {} };
  globalThis.once = once;

  try {
    await import('../../../src/components/status/status.js');
    const status = renderStatus({
      status__messages: { status: ['Saved.'], info: ['Open Sat.'] },
      status__dismissible: true,
    });
    const [first, second] = status.querySelectorAll('button');
    const behavior = globalThis.Drupal.behaviors.emulsifyStatus;
    expect(first.type).toBe('button');
    expect(first.textContent.trim()).toBe('Dismiss');
    expect(first.hidden).toBe(true);
    expect(status.querySelector('[role="status"] button')).toBeNull();

    behavior.attach(first);
    behavior.attach(status);
    expect(first.hidden).toBe(false);
    expect(second.hidden).toBe(false);
    expect(first.getAttribute('data-once')).toBe('emulsify-status-dismiss');

    first.focus();
    first.click();
    expect(first.closest('.status__message').hidden).toBe(true);
    expect(second.closest('.status__message').hidden).toBe(false);
    expect(document.activeElement).toBe(second);

    second.click();
    expect(document.activeElement).toBe(status);
    expect(status.querySelector('.status__message:not([hidden])')).toBeNull();

    behavior.detach(status, {}, 'unload');
    expect(first.hidden).toBe(true);
    expect(first.hasAttribute('data-once')).toBe(false);
  } finally {
    delete globalThis.Drupal;
    delete globalThis.once;
  }
});
