import { renderTwig } from '@emulsify/core/storybook';
import typeScaleTwig from './type-scale.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const typeScaleData = { fontSize: tokens['font-size'] };

export default {
  title: 'Tokens/Type Scale',
  render: renderTwig(typeScaleTwig),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};

export const TypeScale = {
  args: typeScaleData,
  parameters: {
    design: {
      type: 'figma',
      url: figma.url + figma.typeScale,
    },
  },
};
