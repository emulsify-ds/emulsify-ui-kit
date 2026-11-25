import { renderTwig } from '@emulsify/core/storybook';
import { contrastRatio, tokenRows } from '../../util/token-story.js';
import template from '../../util/_token-story.twig';
import tokens from '../tokens/tokens.json';

export default {
  title: 'Base/Colors',
  render: renderTwig(template),
};

function colorStory(theme) {
  const colors = tokens.colors[theme];
  const rows = tokenRows(colors, 'clr', 'color').map((row) => ({
    ...row,
    contrast: contrastRatio(row.value, colors.background).toFixed(2),
  }));

  return {
    args: {
      heading: 'Colors',
      description: `Contrast against the default ${theme} background (${colors.background}).`,
      theme,
      sections: [{ rows }],
    },
  };
}

export const Light = colorStory('light');
export const Dark = colorStory('dark');
