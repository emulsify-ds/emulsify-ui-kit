import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './icon.component.yml';
import docs from './icon.docs.js';
import icon from './icon.twig';

const theme = createContainerThemeControls();

export default {
  title: 'Components/Icon',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(icon)),
  args: { ...argsFromSchema(schema.props), ...theme.args },
  argTypes: { ...theme.argTypes },
};

export const Meaningful = {
  args: {
    icon__name: 'circle-info',
    icon__id: 'icon-example',
    icon__title: 'Information',
    icon__desc: 'Details that help you complete this step.',
  },
};

export const Decorative = {
  args: {
    icon__name: 'arrow-right',
    icon__decorative: true,
  },
};
