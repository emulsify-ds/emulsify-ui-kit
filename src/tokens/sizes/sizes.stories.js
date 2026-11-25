import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';
import sizeTwig from './sizes.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const sizeData = { size: tokens.size };

export default {
  title: 'Tokens/Sizes',
  render: renderTwig(withStorybookPadding(sizeTwig)),
};

export const Sizes = {
  args: sizeData,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.size,
    },
  },
};
