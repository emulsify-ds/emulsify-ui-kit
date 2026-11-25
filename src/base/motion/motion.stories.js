import { renderTwig } from '@emulsify/core/storybook';
import { tokenRows } from '../../util/token-story.js';
import template from '../../util/_token-story.twig';
import tokens from '../tokens/tokens.json';

export default {
  title: 'Base/Motion',
  render: renderTwig(template),
};

const rows = tokenRows(tokens.motion, 'mo').map((row) => ({
  ...row,
  sample: row.name,
}));

export const Motion = {
  args: {
    heading: 'Motion',
    description:
      'Hover a preview or focus its copy control to see the transition.',
    sections: [{ rows }],
  },
};
