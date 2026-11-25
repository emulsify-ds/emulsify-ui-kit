import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';
import template from './border-radius-tokens.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { radius: tokens.radius };

export default {
  title: 'Base/Border Radius',
  render: renderTwig(withStorybookPadding(template)),
};

export const borderRadius = {
  args: data,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.borderRadius,
    },
  },
};
