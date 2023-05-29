import video from './video.twig';

import videoEmbedData from './video-embed.yml';
import videoHTML5Data from './video-html5.yml';

import './video-embed';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Media' };

export const videoEmbed = () => video(videoEmbedData);
export const videoHtml5 = () => video(videoHTML5Data);
