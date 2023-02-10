import colors from './colors.twig';

import colorsData from './colors.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Base/Colors',
};

export const Palettes = () => colors(colorsData);
