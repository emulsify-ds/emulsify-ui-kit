import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const image = twig.twig({
  data: readFileSync(new URL('./image.twig', import.meta.url), 'utf8'),
  rethrow: true,
});
const args = {
  image__src: '/camera.png',
  image__alt: 'Camera on a tripod',
};

function render(props) {
  document.body.innerHTML = image.render({ ...args, ...props });
  return document.body.firstElementChild;
}

it('renders responsive and intrinsic attributes on the fallback image', () => {
  const element = render({
    image__srcset: '/camera-small.png 320w, /camera.png 847w',
    image__sizes: '100vw',
    image__width: 847,
    image__height: 451,
    image__blockname: 'card',
  });

  expect(element.tagName).toBe('IMG');
  expect(element.classList.contains('card__image')).toBe(true);
  expect(element.getAttribute('alt')).toBe(args.image__alt);
  expect(element.getAttribute('sizes')).toBe('100vw');
  expect(element.getAttribute('srcset')).toContain('847w');
  expect(element.getAttribute('width')).toBe('847');
  expect(element.getAttribute('height')).toBe('451');
});

it('requires meaningful alt text unless the image is decorative', () => {
  expect(render({ image__alt: '  ' })).toBeNull();
  const element = render({
    image__alt: '',
    image__decorative: true,
    image__url: '/events',
  });
  expect(element.tagName).toBe('IMG');
  expect(element.getAttribute('alt')).toBe('');
});

it('provides one picture fallback for art direction', () => {
  const element = render({
    image__sources: [{ media: '(max-width: 40rem)', srcset: '/crop.png' }],
  });
  expect(element.tagName).toBe('PICTURE');
  expect(element.querySelector('source').getAttribute('srcset')).toBe(
    '/crop.png',
  );
  expect(element.querySelector('img').getAttribute('src')).toBe('/camera.png');
});

it.each(['image__caption', 'image__credit'])(
  'creates a figure when %s is given',
  (field) => {
    const element = render({ [field]: 'A visible note' });
    expect(element.tagName).toBe('FIGURE');
    expect(element.querySelector('figcaption').textContent.trim()).toBe(
      'A visible note',
    );
  },
);

it('renders a linked image without a figure when there is no visible note', () => {
  expect(render({ image__url: '/events' }).tagName).toBe('A');
});
