import template from './audio-player.twig';
import audioData from './audio-player.yml';
import figma from '../../../.storybook/configma.json';

export default {
  title: 'Components/Media/Audio Player',
};

export const AudioPlayer = () => template(audioData);

AudioPlayer.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.audioPlayer,
  },
};
