import { renderTwig } from '@emulsify/core/storybook';
import figma from '../../../config/configma.json';
import { tokenRows } from '../../util/token-story.js';
import template from '../../util/_token-story.twig';
import tokens from '../tokens/tokens.json';

export default {
  title: 'Base/Opacity',
  render: renderTwig(template),
};

export const Opacity = {
  args: {
    heading: 'Opacity',
    sections: [{ rows: tokenRows(tokens.opacity, 'op', 'opacity') }],
  },
  parameters: { design: { type: 'figma', url: figma.url + figma.opacity } },
};
