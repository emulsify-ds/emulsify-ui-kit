import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';

import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const sourceDirectory = new URL(
  '../../../src/components/video/',
  import.meta.url,
);

const { jest } = import.meta;
const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
twig.extendFilter('t', (text) => text);
const template = twig.twig({
  data: readFileSync(new URL('./video.twig', sourceDirectory), 'utf8'),
  rethrow: true,
});

function render(props) {
  document.body.innerHTML = template.render({
    video__title: 'How to use the camera',
    video__sources: [{ src: '/demo.webm', type: 'video/webm' }],
    ...props,
  });
  return document.body.firstElementChild;
}

it('renders native controls, poster, typed sources, and captions', () => {
  const figure = render({
    video__caption: 'Camera tutorial',
    video__poster: '/camera.jpg',
    video__tracks: [
      { src: '/captions.vtt', srclang: 'en', label: 'English', default: true },
      { src: '/other.vtt', srclang: 'fr', label: 'French', default: false },
    ],
  });
  const media = figure.querySelector('video');
  const [english, french] = media.querySelectorAll('track');

  expect(figure.tagName).toBe('FIGURE');
  expect(figure.querySelector('figcaption').textContent.trim()).toBe(
    'Camera tutorial',
  );
  expect(media.controls).toBe(true);
  expect(media.poster).toMatch(/\/camera\.jpg$/);
  expect(media.querySelector('source').type).toBe('video/webm');
  expect(english.kind).toBe('captions');
  expect(english.default).toBe(true);
  expect(french.default).toBe(false);
  expect(figure.querySelector('button').hidden).toBe(true);
});

it('renders a named embed with the selected aspect ratio', () => {
  const element = render({
    video__type: 'embed',
    video__embed_url: '/film',
    video__aspect_ratio: '4:3',
  });

  expect(element.querySelector('iframe').title).toBe('How to use the camera');
  expect(element.querySelector('iframe').getAttribute('src')).toBe('/film');
  expect(element.querySelector('.video__wrap').dataset.videoRatio).toBe('4:3');
});

describe('video playback', () => {
  const bound = new WeakSet();
  const once = (id, nodes) =>
    nodes.filter((node) => {
      if (bound.has(node)) return false;
      bound.add(node);
      return true;
    });
  once.remove = (id, nodes) => nodes.filter((node) => bound.delete(node));

  let reduceMotion = false;
  let motion;

  beforeAll(async () => {
    globalThis.Drupal = { behaviors: {} };
    globalThis.once = once;
    window.matchMedia = jest.fn(() => {
      motion = new EventTarget();
      motion.matches = reduceMotion;
      return motion;
    });
    await import('../../../src/components/video/video.js');
  });

  afterAll(() => {
    delete globalThis.Drupal;
    delete globalThis.once;
    delete window.matchMedia;
  });

  function setup(props) {
    const element = render({ video__poster: '/camera.jpg', ...props });
    const media = element.querySelector('video');
    let paused = true;
    Object.defineProperty(media, 'paused', { get: () => paused });
    media.play = jest.fn(async () => {
      paused = false;
      media.dispatchEvent(new Event('play'));
    });
    media.pause = jest.fn(() => {
      paused = true;
      media.dispatchEvent(new Event('pause'));
    });
    return {
      element,
      media,
      button: element.querySelector('button'),
      behavior: globalThis.Drupal.behaviors.emulsifyVideo,
    };
  }

  it('binds once and keeps the play or pause label in sync', () => {
    const { element, media, button, behavior } = setup();
    behavior.attach(element);
    behavior.attach(document);
    expect(button.hidden).toBe(false);
    expect(button.textContent).toBe('Play video');
    button.click();
    expect(media.play).toHaveBeenCalledTimes(1);
    expect(button.textContent).toBe('Pause video');
    button.click();
    expect(media.pause).toHaveBeenCalledTimes(1);
    expect(button.textContent).toBe('Play video');
  });

  it('starts muted background playback only when motion is allowed', () => {
    reduceMotion = true;
    const reduced = setup({ video__autoplay: true });
    reduced.behavior.attach(document);
    expect(reduced.media.play).not.toHaveBeenCalled();

    reduceMotion = false;
    const enabled = setup({ video__autoplay: true });
    enabled.behavior.attach(document);
    expect(enabled.media.hasAttribute('muted')).toBe(true);
    expect(enabled.media.hasAttribute('autoplay')).toBe(false);
    expect(enabled.media.play).toHaveBeenCalledTimes(1);
  });

  it('pauses decorative playback when the motion preference changes', () => {
    reduceMotion = false;
    const { element, media, button, behavior } = setup({
      video__autoplay: true,
      video__decorative: true,
    });
    expect(media.controls).toBe(true);
    expect(media.hasAttribute('aria-hidden')).toBe(false);
    behavior.attach(element);
    expect(media.controls).toBe(false);
    expect(media.getAttribute('aria-hidden')).toBe('true');
    expect(button.hidden).toBe(false);
    expect(button.textContent).toBe('Pause video');

    const change = new Event('change');
    change.matches = true;
    motion.dispatchEvent(change);
    expect(media.pause).toHaveBeenCalledTimes(1);
    expect(button.textContent).toBe('Play video');

    behavior.detach(element, {}, 'unload');
    expect(media.controls).toBe(true);
    expect(media.hasAttribute('aria-hidden')).toBe(false);
  });

  it('exposes the native playback controls when decorative autoplay is blocked', async () => {
    const { element, media, button, behavior } = setup({
      video__autoplay: true,
      video__decorative: true,
    });
    media.play.mockRejectedValue(new DOMException('', 'NotAllowedError'));
    behavior.attach(element);
    await Promise.resolve();

    expect(media.controls).toBe(true);
    expect(media.hasAttribute('aria-hidden')).toBe(false);
    expect(button.textContent).toBe('Play video');
  });
});
