import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';
import { createTwigIncludeFunction } from '@emulsify/core/storybook/twig/include-function';

const sourceDirectory = new URL(
  '../../../src/components/logo/',
  import.meta.url,
);

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
const parse = (path) =>
  twig.twig({
    data: readFileSync(new URL(path, sourceDirectory), 'utf8'),
    rethrow: true,
  });
const image = parse('../image/image.twig');
twig.extendFunction(
  'include',
  createTwigIncludeFunction((name) =>
    name === '@components/image/image.twig'
      ? (props) => image.render(props)
      : undefined,
  ),
);
const template = parse('./logo.twig');

function renderLogo(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('renders an image with alternative text and intrinsic dimensions', () => {
  const logo = renderLogo({
    logo__src: '/assets/logo.svg',
    logo__alt: 'Emulsify UI Kit',
    logo__width: 175,
    logo__height: 60,
    logo__attributes: { id: 'branding', class: 'example' },
    logo__blockname: 'header',
  });

  expect(logo.matches('#branding.logo.header__logo.example')).toBe(true);
  const imageElement = logo.querySelector('img.logo__image');
  expect(imageElement.getAttribute('src')).toBe('/assets/logo.svg');
  expect(imageElement.alt).toBe('Emulsify UI Kit');
  expect(imageElement.width).toBe(175);
  expect(imageElement.height).toBe(60);
  expect(logo.querySelector('a, #branding, .example')).toBeNull();
});

test('uses the image alt text to name its optional link', () => {
  const logo = renderLogo({
    logo__src: '/assets/logo.svg',
    logo__alt: 'Emulsify UI Kit home',
    logo__url: '/',
    logo__modifiers: ['header'],
  });

  expect(logo.matches('.logo--header')).toBe(true);
  const link = logo.querySelector('a.logo__link');
  expect(link.getAttribute('href')).toBe('/');
  expect(link.querySelector('img').alt).toBe('Emulsify UI Kit home');
});

test('omits a missing text alternative and avoids unsupported link schemes', () => {
  expect(
    renderLogo({ logo__src: '/assets/logo.svg', logo__alt: ' ' }),
  ).toBeNull();
  const logo = renderLogo({
    logo__src: '/assets/logo.svg',
    logo__alt: 'Emulsify UI Kit',
    logo__url: 'javascript:void(0)',
  });

  expect(logo.querySelector('img')).not.toBeNull();
  expect(logo.querySelector('a')).toBeNull();
});
