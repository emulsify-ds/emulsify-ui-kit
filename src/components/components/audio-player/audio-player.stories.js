import audioPlayer from './audio-player.twig';
import audioData from './audio-player.yml';

export default {
  title: 'Components/Media/Audio Player',
};

export const AudioPlayer = () => audioPlayer(audioData);
