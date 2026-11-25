import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';
import typeScaleTwig from './type-scale.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const typeScaleData = { fontSize: tokens['font-size'] };

export default {
  title: 'Base/Type Scale',
  render: renderTwig(withStorybookPadding(typeScaleTwig)),
};

export const TypeScale = {
  args: typeScaleData,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.typeScale,
    },
  },
};
