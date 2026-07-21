import { renderTwig } from '@emulsify/core/storybook';

import template from './opacity.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { opacity: tokens.opacity };

export default {
  title: 'Tokens/Opacity',
  render: renderTwig(template),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};

export const Opacity = {
  args: data,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.opacity,
    },
  },
};
