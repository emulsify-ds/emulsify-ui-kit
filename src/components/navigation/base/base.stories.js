import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../../util/storybookContainerControls.js';
import schema from './base.component.yml';
import docs from './base.docs.js';
import template from './base.twig';
import './menu-toggle/menu-toggle.js';

const theme = createContainerThemeControls();
const renderMenu = withStorybookContainer(template);

export default {
  title: 'Components/Navigation/Base',
  tags: ['autodocs'],
  parameters: { docs },
  args: { ...argsFromSchema(schema.props), ...theme.args },
  argTypes: theme.argTypes,
  render: (args, { viewMode } = {}) =>
    renderTwig(renderMenu, { wrapper: viewMode === 'docs' ? 'div' : 'main' })(
      args,
    ),
};

export const Menu = {
  args: { base__disclosures: true },
};
