import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../../util/storybookContainerControls.js';
import schema from './breadcrumbs.component.yml';
import docs from './breadcrumbs.docs.js';
import template from './breadcrumbs.twig';

const themeControls = createContainerThemeControls();
const preview = withStorybookContainer(template);

export default {
  title: 'Components/Navigation/Breadcrumbs',
  tags: ['autodocs'],
  parameters: { docs },
  render: (args, { viewMode } = {}) =>
    renderTwig(preview, { wrapper: viewMode === 'docs' ? 'div' : 'main' })(
      args,
    ),
  args: { ...argsFromSchema(schema.props), ...themeControls.args },
  argTypes: themeControls.argTypes,
};

export const Breadcrumbs = {};
