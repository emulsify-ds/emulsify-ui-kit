import { renderTwig } from '@emulsify/core/storybook';
import { withStorybookPadding } from '../../util/storybookContainer.js';

import gridTwig from './grid.twig';
import gridData from './grid.yml';

export default {
  title: 'Layout/Grid',
  render: renderTwig(withStorybookPadding(gridTwig)),
  argTypes: {
    grid__columns: {
      name: 'Column Number',
      control: 'select',
      options: ['1', '2', '3', '4'],
    },
    grid__spacing: {
      name: 'Grid Spacing',
      control: 'select',
      options: ['no-spacing', '', 'two-spacing'],
    },
  },
};

export const grid = {
  args: {
    ...gridData,
    grid__columns: '3',
    grid__spacing: '',
  },
};
