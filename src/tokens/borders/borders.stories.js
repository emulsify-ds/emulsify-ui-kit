import { renderTwig } from '@emulsify/core/storybook';

import template from './borders.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { border: tokens.border };

export default {
  title: 'Tokens/Borders',
  render: renderTwig(template),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
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
