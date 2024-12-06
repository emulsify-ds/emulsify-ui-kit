import video from './video.twig';

import { props as videoEmbedProps } from './video-embed.yml';
import { props as videoHTML5Props } from './video-html5.yml';

import { mapDataToTwig } from '../../util/dataTransformers';
import './video-embed';

/**
 * Storybook Definition.
 */
export default { title: 'Components/Media' };

const videoEmbedData = mapDataToTwig(videoEmbedProps.properties);
const videoHTML5Data = mapDataToTwig(videoHTML5Props.properties);

export const videoEmbed = () => video(videoEmbedData);
export const videoHtml5 = () => video(videoHTML5Data);
