import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';

import template from './borders.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { border: tokens.border };

export default {
  title: 'Base/Borders',
  render: renderTwig(withStorybookPadding(template)),
};

export const Borders = {
  args: data,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.border,
    },
  },
};
