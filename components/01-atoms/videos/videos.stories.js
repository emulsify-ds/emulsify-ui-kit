import video from './video.twig';

import videoEmbedData from './video-embed.yml';
import videoHTML5Data from './video-html5.yml';

import './video-embed';

/**
 * Storybook Definition.
 */
export default { title: 'Atoms/Videos' };

export const embed = () => video(videoEmbedData);
export const html5 = () => video(videoHTML5Data);
