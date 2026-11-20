import { renderTwig } from '@emulsify/core/storybook';
import template from './line-height.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { lineHeight: tokens['line-height'] };

export default {
  title: 'Tokens/Line Height',
  render: renderTwig(template),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
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
