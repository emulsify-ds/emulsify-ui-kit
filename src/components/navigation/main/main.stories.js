import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../../util/storybookContainer.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../../util/storybookContainerControls.js';
import schema from './main.component.yml';
import docs from './main.docs.js';
import template from './main.twig';
import '../base/menu-toggle/menu-toggle.js';
import './main.js';

const theme = createContainerThemeControls();
const width = createContainerWidthControls();
const renderMenu = withStorybookContainer(template);

export default {
  title: 'Components/Navigation/Main',
  tags: ['autodocs'],
  parameters: { docs },
  args: {
    ...argsFromSchema(schema.props),
    ...theme.args,
    ...width.args,
    width: 'wide',
  },
  argTypes: { ...theme.argTypes, ...width.argTypes },
  render: (args, { viewMode } = {}) =>
    renderTwig(renderMenu, { wrapper: viewMode === 'docs' ? 'div' : 'main' })(
      args,
    ),
};

export const Main = {};

export const Compact = {
  args: {
    main__id: 'compact-main-nav',
    main__items: [
      { title: 'Books and digital resources', url: '/collections' },
      { title: 'Accessibility and visitor information', url: '/visit' },
      { title: 'Community programs and library events', url: '/programs' },
      { title: 'Borrowing and renewing library materials', url: '/borrow' },
    ],
    width: 'narrow',
  },
};
