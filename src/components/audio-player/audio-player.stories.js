import template from './audio-player.twig';
import { props } from './audio-player.component.yml';
import figma from '../../../.storybook/configma.json';

const audioData = props.properties.audio_content.data;

export default {
  title: 'Components/Media/Audio Player',
};

export const AudioPlayer = () => template({ audio_content: audioData });

AudioPlayer.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.audioPlayer,
  },
};
