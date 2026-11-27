import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './table.component.yml';
import docs from './table.docs.js';
import './table.js';
import tableTwig from './table.twig';

const themeControls = createContainerThemeControls();
const widthControls = createContainerWidthControls();

export default {
  title: 'Components/Table',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(tableTwig)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
    ...widthControls.args,
  },
  argTypes: { ...themeControls.argTypes, ...widthControls.argTypes },
};

export const Table = {};

export const Wide = {
  args: {
    table__caption: 'Community center room capacities',
    table__header: [
      'Room',
      'Auditorium',
      'Classroom',
      'Discussion',
      'Reception',
      'Workshop',
      'Banquet',
    ],
    table__rows: [
      { cells: [{ tag: 'th', content: 'Studio' }, 45, 26, 20, 35, 16, 24] },
      { cells: [{ tag: 'th', content: 'Workshop' }, 60, 32, 30, 55, 20, 32] },
    ],
  },
};
