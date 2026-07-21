import { renderTwig } from '@emulsify/core/storybook';

import gridTwig from './grid.twig';
import gridData from './grid.yml';

export default {
  title: 'Layout/Grid',
  render: renderTwig(gridTwig),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
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
