import gridTwig from './grid.twig';
import gridData from './grid.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Layout/Grid',
  argTypes: {
    columnNumber: {
      control: { type: 'select' },
      options: ['1', '2', '3', '4'],
    },
    gridSpacing: {
      control: { type: 'select' },
      options: {
        '0x Spacing': 'no-spacing',
        '1x Spacing': '',
        '2x Spacing': 'two-spacing',
      },
    },
  },
  arg: {
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
