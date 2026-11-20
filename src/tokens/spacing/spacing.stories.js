import { renderTwig } from '@emulsify/core/storybook';

import template from './spacing.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { spacing: tokens.spacing };

export default {
  title: 'Tokens/Spacing',
  render: renderTwig(template),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
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
