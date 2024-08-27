import image from './image/responsive-image.twig';
import figure from './image/figure.twig';

import imageData from './image/image.yml';
import figureData from './image/figure.yml';

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
