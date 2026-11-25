import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';

import template from './spacing.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { spacing: tokens.spacing };

export default {
  title: 'Base/Spacing',
  render: renderTwig(withStorybookPadding(template)),
};

export const Spacing = {
  args: data,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.spacing,
    },
  },
};
