import { renderTwig } from '@emulsify/core/storybook';
import template from './border-radius-tokens.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { radius: tokens.radius };

export default {
  title: 'Tokens/Border Radius',
  render: renderTwig(template),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
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
