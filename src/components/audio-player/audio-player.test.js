import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { URL } from 'node:url';
import { registerTwigExtensions } from '@emulsify/core/extensions/twig';

const require = createRequire(import.meta.url);
const requireCore = createRequire(
  require.resolve('@emulsify/core/package.json'),
);
const twig = registerTwigExtensions(requireCore('twig').factory());
twig.extendFilter('t', (message) => message);
const template = twig.twig({
  data: readFileSync(new URL('./audio-player.twig', import.meta.url), 'utf8'),
  rethrow: true,
});

function renderPlayer(props) {
  document.body.innerHTML = template.render(props);
  return document.body.firstElementChild;
}

test('uses native controls with ordered sources and user-initiated playback', () => {
  const player = renderPlayer({
    audio_player__sources: [
      { src: '/audio/recording.ogg', type: 'audio/ogg' },
      '/audio/recording.mp3',
    ],
    audio_player__label: 'Oral history interview',
    autoplay: true,
    audio_player__autoplay: true,
  });
  const audio = player.querySelector('audio');

  expect(audio.controls).toBe(true);
  expect(audio.hasAttribute('autoplay')).toBe(false);
  expect(audio.getAttribute('aria-label')).toBe('Oral history interview');
  expect(audio.getAttribute('preload')).toBe('none');
  expect(
    [...audio.querySelectorAll('source')].map((source) => [
      source.getAttribute('src'),
      source.getAttribute('type'),
    ]),
  ).toEqual([
    ['/audio/recording.ogg', 'audio/ogg'],
    ['/audio/recording.mp3', null],
  ]);
  expect(audio.querySelector('a').getAttribute('href')).toBe(
    '/audio/recording.ogg',
  );
});

test('forwards playback preferences without hiding the transcript', () => {
  const player = renderPlayer({
    audio_player__sources: ['/audio/recording.mp3'],
    audio_player__preload: 'metadata',
    audio_player__loop: true,
    audio_player__muted: true,
    audio_player__no_download: true,
    audio_player__transcript_url: '/transcripts/interview',
    audio_player__transcript_label: 'Read the interview transcript',
  });
  const audio = player.querySelector('audio');

  expect(audio.getAttribute('preload')).toBe('metadata');
  expect(audio.loop).toBe(true);
  expect(audio.defaultMuted).toBe(true);
  expect(audio.getAttribute('controlslist')).toBe('nodownload');
  expect(audio.querySelector('a')).toBeNull();
  const transcript = player.querySelector('.audio-player__transcript');
  expect(transcript.getAttribute('href')).toBe('/transcripts/interview');
  expect(transcript.textContent).toBe('Read the interview transcript');
});

test('displays a transcript even when audio sources are absent', () => {
  const player = renderPlayer({ audio_player__transcript_url: '#transcript' });
  expect(player.querySelector('audio')).toBeNull();
  expect(player.querySelector('a').textContent).toBe('Read the transcript');
});

test('ignores empty sources and unsupported URL schemes', () => {
  expect(
    renderPlayer({
      audio_player__sources: ['', {}, 'javascript:void(0)'],
      audio_player__transcript_url: 'javascript:void(0)',
    }),
  ).toBeNull();
});
