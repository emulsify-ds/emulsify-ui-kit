import { renderTwig } from '@emulsify/core/storybook';

import template from './breakpoints.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { breakpoint: tokens.breakpoint };

export default {
  title: 'Tokens/Breakpoints',
  render: renderTwig(template),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
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
