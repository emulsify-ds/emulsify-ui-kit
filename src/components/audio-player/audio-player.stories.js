import { renderTwig } from '@emulsify/core/storybook';
import audioPlayerData from './audio-player.component.yml';
import audioPlayerTwig from './audio-player.twig';

export default {
  title: 'Components/Media/Audio Player',
  render: renderTwig(audioPlayerTwig),
  argTypes: {
    audio_content: {
      name: 'Audio Content',
      control: 'text',
    },
  },
};

const { properties } = audioPlayerData.props;

export const audioPlayer = {
  args: {
    audio_content: properties.audio_content.data,
  },
};
