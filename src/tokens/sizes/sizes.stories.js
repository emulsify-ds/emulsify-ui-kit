import { renderTwig } from '@emulsify/core/storybook';
import sizeTwig from './sizes.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const sizeData = { size: tokens.size };

export default {
  title: 'Tokens/Sizes',
  render: renderTwig(sizeTwig),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};

export const Sizes = {
  args: sizeData,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.size,
    },
  },
};
