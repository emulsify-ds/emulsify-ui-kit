import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../../util/storybookContainerControls.js';
import template from './social.twig';
import schema from './social.component.yml';
import docs from './social.docs.js';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Navigation/Social',
  tags: ['autodocs'],
  parameters: { docs },
  render: (args, { viewMode } = {}) =>
    renderTwig(withStorybookContainer(template), {
      wrapper: viewMode === 'docs' ? 'div' : 'main',
    })(args),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
  },
  argTypes: {
    ...themeControls.argTypes,
    social__items: { control: 'object' },
  },
};

export const Social = {};
