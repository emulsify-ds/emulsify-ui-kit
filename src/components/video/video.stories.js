import { renderTwig } from '@emulsify/core/storybook';

import videoTwig from './video.twig';

import { props as videoEmbedProps } from './video-embed.yml';
import { props as videoHTML5Props } from './video-html5.yml';

import { mapDataToTwig } from '../../util/dataTransformers';
import './video-embed';

const videoEmbedData = mapDataToTwig(videoEmbedProps.properties);
const videoHTML5Data = mapDataToTwig(videoHTML5Props.properties);

export default {
  title: 'Components/Media/Video',
  render: renderTwig(videoTwig),
};

export const videoEmbed = {
  args: videoEmbedData,
};

export const videoHtml5 = {
  args: videoHTML5Data,
};
