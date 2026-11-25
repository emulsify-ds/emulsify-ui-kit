import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';

import template from './breakpoints.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { breakpoint: tokens.breakpoint };

export default {
  title: 'Base/Breakpoints',
  render: renderTwig(withStorybookPadding(template)),
};

export const Breakpoints = {
  args: data,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.breakpoint,
    },
  },
};
