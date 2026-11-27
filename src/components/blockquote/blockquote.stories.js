import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './blockquote.component.yml';
import docs from './blockquote.docs.js';
import blockquoteTwig from './blockquote.twig';

const themeControls = createContainerThemeControls();

export default {
  title: 'Components/Blockquote',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(blockquoteTwig)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
  },
  argTypes: {
    ...themeControls.argTypes,
    blockquote__style: {
      control: 'select',
      options: schema.props.properties.blockquote__style.enum.filter(Boolean),
    },
  },
};

export const BarLeft = {};
export const BarRight = {
  args: { blockquote__style: 'bar-right' },
};
export const QuoteLeft = {
  args: { blockquote__style: 'quote-left' },
};
export const WithoutAttribution = {
  args: {
    blockquote__attribution: null,
    blockquote__attribution_secondary: null,
  },
};
