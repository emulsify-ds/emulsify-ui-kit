import { renderTwig } from '@emulsify/core/storybook';
import figma from '../../../config/configma.json';
import { tokenRows } from '../../util/token-story.js';
import template from '../../util/_token-story.twig';
import tokens from '../tokens/tokens.json';

export default {
  title: 'Base/Radius',
  render: renderTwig(template),
};

export const Radius = {
  args: {
    heading: 'Radius',
    sections: [
      { title: 'Border radius', rows: tokenRows(tokens.radius, 'r', 'radius') },
      { title: 'Border width', rows: tokenRows(tokens.borderWidths, 'bw') },
    ],
  },
  parameters: { design: { type: 'figma', url: figma.url + figma.radius } },
};
