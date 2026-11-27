import { renderTwig } from '@emulsify/core/storybook';

import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './search.component.yml';
import docs from './search.docs.js';
import template from './search.twig';
import './search.js';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Search',
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
  },
};

export const Search = {};

export const Disclosure = {
  args: {
    search__id: 'search-disclosure-story',
    search__show_toggle: true,
    search__show_label: false,
  },
};
