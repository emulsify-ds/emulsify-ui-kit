import { renderTwig } from '@emulsify/core/storybook';
import figma from '../../../config/configma.json';
import { tokenRows } from '../../util/token-story.js';
import template from '../../util/_token-story.twig';
import tokens from '../tokens/tokens.json';

export default {
  title: 'Base/Spacing',
  render: renderTwig(template),
};

export const Spacing = {
  args: {
    heading: 'Spacing',
    sections: [{ rows: tokenRows(tokens.spacing, 'space', 'space') }],
  },
  parameters: { design: { type: 'figma', url: figma.url + figma.spacing } },
};
