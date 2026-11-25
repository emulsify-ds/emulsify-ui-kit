import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';

import colorsTwig from './color.twig';
import tokens from '../transformed.tokens.json';

const colorsData = { colors: tokens.color };

export default {
  title: 'Tokens/Colors',
  render: renderTwig(withStorybookPadding(colorsTwig)),
};

export const Colors = {
  args: colorsData,
};
