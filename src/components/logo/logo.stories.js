import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './logo.component.yml';
import docs from './logo.docs.js';
import template from './logo.twig';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Logo',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(template)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
    logo__width: 175,
    logo__height: 60,
  },
  argTypes: themeControls.argTypes,
};

export const Logo = {};

export const Linked = {
  args: {
    logo__url: '/',
    logo__alt: 'Emulsify UI Kit home',
    logo__modifiers: ['header'],
  },
};
