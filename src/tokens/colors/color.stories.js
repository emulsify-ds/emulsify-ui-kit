import { renderTwig } from '@emulsify/core/storybook';

import colorsTwig from './color.twig';
import tokens from '../transformed.tokens.json';

const colorsData = { colors: tokens.color };

export default {
  title: 'Tokens/Colors',
  render: renderTwig(colorsTwig),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
};

export const Colors = {
  args: colorsData,
};
