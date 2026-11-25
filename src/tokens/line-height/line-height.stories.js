import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';
import template from './line-height.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { lineHeight: tokens['line-height'] };

export default {
  title: 'Base/Line Height',
  render: renderTwig(withStorybookPadding(template)),
};

export const LineHeight = {
  args: data,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.lineHeight,
    },
  },
};
