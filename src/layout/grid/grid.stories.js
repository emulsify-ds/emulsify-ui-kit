import gridTwig from './grid.twig';
import gridData from './grid.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Layout/Grid',
  argTypes: {
    columnNumber: {
      name: 'Column Number',
      control: { type: 'select' },
      options: ['1', '2', '3', '4'],
    },
    gridSpacing: {
      name: 'Grid Spacing',
      control: { type: 'select' },
      options: {
        '0x Spacing': 'no-spacing',
        '1x Spacing': '',
        '2x Spacing': 'two-spacing',
      },
    },
  },
  args: {
    columnNumber: '3',
    gridSpacing: '',
  },
};

export const grid = ({ columnNumber, gridSpacing }) =>
  gridTwig({
    ...gridData,
    grid__columns: columnNumber,
    grid__spacing: gridSpacing,
  });
