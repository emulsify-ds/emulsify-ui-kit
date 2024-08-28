import imageTwig from './responsive-image.twig';
import figureTwig from './figure.twig';

import { props as imageProps } from './image.component.yml';
import { props as figureProps } from './figure.component.yml';

import { mapDataToTwig } from '../../util/dataTransformers';

const svgIcons = require.context('../../../assets/icons/', true, /\.svg$/);
const icons = [];
svgIcons.keys().forEach((key) => {
  const icon = key.split('./')[1].split('.')[0];
  icons.push(icon);
});

const imageData = mapDataToTwig(imageProps.properties);
const figureData = mapDataToTwig(figureProps.properties);

/**
 * Storybook Definition.
 */

export default {
  title: 'Components/Media',
  decorators: [
    (story) =>
      `<div style="max-width: 890px; margin: 0 auto;">${story()}</div>`,
  ],
};

export const Image = () => imageTwig(imageData);

export const Figure = () => figureTwig(figureData);
