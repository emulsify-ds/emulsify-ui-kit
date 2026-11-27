import { renderTwig } from '@emulsify/core/storybook';
import figma from '../../../config/configma.json';
import { tokenRows } from '../../util/token-story.js';
import template from './typography.twig';
import tokens from '../tokens/tokens.json';

export default {
  title: 'Base/Typography',
  render: renderTwig(template),
};

export const Typography = {
  args: {
    styles: tokens.typography,
    sections: [
      { title: 'Font families', rows: tokenRows(tokens.fontFamilies, 'ff') },
      { title: 'Font sizes', rows: tokenRows(tokens.fontSizes, 'fs') },
      { title: 'Font weights', rows: tokenRows(tokens.fontWeights, 'fw') },
      { title: 'Line heights', rows: tokenRows(tokens.lineHeights, 'lh') },
      { title: 'Letter spacing', rows: tokenRows(tokens.letterSpacings, 'ls') },
    ],
  },
  parameters: { design: { type: 'figma', url: figma.url + figma.typography } },
};
