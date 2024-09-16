import colorsTwig from './color.twig';

import tokens from '../transformed.tokens.json';

const colorsData = { colors: tokens.colors };

export default {
  title: 'Tokens/Colors',
};

export const Colors = () => colorsTwig(colorsData);
