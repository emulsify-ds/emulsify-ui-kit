import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../../util/storybookContainerControls.js';
import schema from './pager.component.yml';
import docs from './pager.docs.js';
import template from './pager.twig';

const themeControls = createContainerThemeControls();
const preview = withStorybookContainer(template);
const { properties } = schema.props;

function example(index) {
  return Object.fromEntries(
    ['pager__items', 'pager__current', 'pager__ellipses'].map((prop) => [
      prop,
      properties[prop].examples[index],
    ]),
  );
}

export default {
  title: 'Components/Navigation/Pager',
  tags: ['autodocs'],
  parameters: { docs },
  render: (args, { viewMode } = {}) =>
    renderTwig(preview, { wrapper: viewMode === 'docs' ? 'div' : 'main' })(
      args,
    ),
  args: { ...argsFromSchema(schema.props), ...themeControls.args },
  argTypes: themeControls.argTypes,
};

export const Basic = {};
export const WithNext = { args: example(1) };
export const WithPrevious = { args: example(2) };
export const WithBoth = { args: example(3) };
export const WithFirstAndLast = { args: example(4) };
