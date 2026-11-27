import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './header.component.yml';
import docs from './header.docs.js';
import template from './header.twig';
import '../navigation/base/menu-toggle/menu-toggle.js';
import '../navigation/main/main.js';
import '../offcanvas/offcanvas.js';
import '../search/search.js';
import './header.js';

const theme = createContainerThemeControls();
const width = createContainerWidthControls();
const preview = withStorybookContainer((args) => {
  const target = String(args.header__skip_target ?? '').replace(
    /[^\w:.-]/g,
    '',
  );
  return `${template({ ...args, header__skip_target: target })}
    <main id="${target || 'header-story-content'}" tabindex="-1">
      <h1>Library resources</h1>
      <p>Explore the collection or plan a visit.</p>
    </main>`;
});

export default {
  title: 'Components/Header',
  tags: ['autodocs'],
  parameters: { docs, layout: 'fullscreen' },
  args: {
    ...argsFromSchema(schema.props),
    ...theme.args,
    ...width.args,
    width: 'wide',
  },
  argTypes: { ...theme.argTypes, ...width.argTypes },
  render: renderTwig(preview),
};

export const Header = {};

export const Compact = {
  args: {
    header__id: 'compact-header',
    header__skip_target: 'compact-main-content',
    width: 'narrow',
  },
};
