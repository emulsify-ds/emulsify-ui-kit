import image from './responsive-image.twig';
import figure from './figure.twig';

import imageData from './image.yml';
import figureData from './figure.yml';

const svgIcons = require.context('../../../assets/icons/', true, /\.svg$/);
const icons = [];
svgIcons.keys().forEach((key) => {
  const icon = key.split('./')[1].split('.')[0];
  icons.push(icon);
});

/**
 * Storybook Definition.
 */
export default { title: 'Components/Media' };

export const images = () => image(imageData);

export const figures = () => figure(figureData);
