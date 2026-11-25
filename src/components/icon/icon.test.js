import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const { jest } = import.meta;
const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const source = jest.fn((path) => {
  try {
    return readFileSync(
      new URL(
        `../../../${path.replace('@assets/', 'assets/')}`,
        import.meta.url,
      ),
      'utf8',
    );
  } catch (error) {
    if (error.code === 'ENOENT') return '';
    throw error;
  }
});
twig.extendFunction('source', source);
const template = twig.twig({
  data: readFileSync(new URL('./icon.twig', import.meta.url), 'utf8'),
  rethrow: true,
});

function renderIcon(props) {
  document.body.innerHTML = template.render(props);
  return document.body.querySelector('svg');
}

beforeEach(() => source.mockClear());

test('renders the icon inline with its viewBox and keeps decorative icons hidden', () => {
  const icon = renderIcon({
    icon__name: 'arrow-right',
    icon__title: 'Next',
    icon__desc: 'Advance by one step',
    icon__decorative: true,
    icon__blockname: 'cta',
  });

  expect(icon.getAttribute('viewBox')).toBe('0 0 48 48');
  expect(icon.getAttribute('class')).toContain('cta__icon');
  expect(icon.getAttribute('aria-hidden')).toBe('true');
  expect(icon.getAttribute('focusable')).toBe('false');
  expect(icon.querySelector('path')).not.toBeNull();
  expect(icon.querySelector('use, title, desc')).toBeNull();
});

test('references stable title and description IDs from the instance prop', () => {
  const icon = renderIcon({
    icon__name: 'circle-info',
    icon__id: 'upload-status',
    icon__title: 'Status',
    icon__desc: 'Upload complete',
  });

  expect(icon.getAttribute('role')).toBe('img');
  expect(icon.getAttribute('aria-labelledby')).toBe('upload-status-title');
  expect(icon.getAttribute('aria-describedby')).toBe(
    'upload-status-description',
  );
  expect(icon.querySelector('#upload-status-title').textContent).toBe('Status');
  expect(icon.querySelector('#upload-status-description').textContent).toBe(
    'Upload complete',
  );
});

test('labels repeated icons without copying exporter IDs when there is no instance prop', () => {
  const props = {
    icon__name: 'play',
    icon__title: 'Ready to play',
    icon__desc: 'The video has loaded',
  };
  document.body.innerHTML = template.render(props) + template.render(props);

  for (const icon of document.querySelectorAll('svg')) {
    expect(icon.getAttribute('aria-label')).toBe(props.icon__title);
    expect(icon.getAttribute('aria-description')).toBe(props.icon__desc);
    expect(icon.querySelector('[id]')).toBeNull();
  }
  expect(document.querySelector('[id="Layer_1"]')).toBeNull();
});

test('skips missing files and keeps the icon lookup within the icon directory', () => {
  expect(renderIcon({ icon__name: '../other-asset' })).toBeNull();
  expect(source).not.toHaveBeenCalled();
  expect(renderIcon({ icon__name: 'missing-icon' })).toBeNull();
  expect(source).toHaveBeenCalledWith('@assets/icons/missing-icon.svg', true);
});
