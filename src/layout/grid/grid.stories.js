import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import gridDocs from './grid.docs.js';
import schema from './grid.yml';
import gridTwig from './grid.twig';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();

const layoutControls = Object.fromEntries(
  Object.entries(schema.props.properties)
    .filter(([, prop]) => prop.enum)
    .map(([name, prop]) => [
      name,
      {
        name: prop.title,
        description: prop.description,
        control: 'select',
        options: prop.enum,
        table: { category: 'Layout' },
      },
    ]),
);

export default {
  title: 'Layout/Grid',
  tags: ['autodocs'],
  render: renderTwig(withStorybookContainer(gridTwig)),
  parameters: { docs: gridDocs, layout: 'fullscreen' },
  argTypes: {
    ...widthControls.argTypes,
    ...themeControls.argTypes,
    ...layoutControls,
    grid__column_focus: {
      ...layoutControls.grid__column_focus,
      if: { arg: 'grid__type', eq: 'focus' },
    },
  },
  args: {
    ...argsFromSchema(schema.props),
    ...widthControls.args,
    ...themeControls.args,
    width: 'wide',
  },
};

export const Grid = {};

export const Focus = {
  args: {
    grid__type: 'focus',
    grid__column_focus: 2,
    grid__alignment: 'center',
  },
};
