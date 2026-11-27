import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import schema from './text.component.yml';
import docs from './text.docs.js';
import textTwig from './text.twig';
import elementTwig from './_text.twig';

const themeControls = createContainerThemeControls();
const widthControls = createContainerWidthControls();

export default {
  title: 'Components/Text',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(textTwig),
  args: {
    ...argsFromSchema(schema.props),
    text__theme: themeControls.args.theme,
    text__theme__variation: themeControls.args.themeVariation,
    text__bg_color: true,
  },
  argTypes: {
    text__content: { control: 'text' },
    text__theme: themeControls.argTypes.theme,
    text__theme__variation: themeControls.argTypes.themeVariation,
    text__width: widthControls.argTypes.width,
  },
};

export const Text = {};

export const InlineElements = {
  args: {
    text__content:
      '<p><strong>Important information</strong> belongs early in a sentence.</p>' +
      '<p>Use <em>emphasis</em> to change the meaning of a phrase.</p>' +
      '<p>The abbreviation <abbr title="HyperText Markup Language">HTML</abbr> names the markup language.</p>' +
      '<p>Press <kbd>Enter</kbd> to run <code>npm test</code>.</p>' +
      '<p>Water is H<sub>2</sub>O and a square is a<sup>2</sup>.</p>' +
      '<p><q>Measure twice before cutting</q> is a short quotation.</p>',
  },
};

export const SingleElement = {
  render: renderTwig((args) =>
    withStorybookContainer(elementTwig)({
      ...args,
      theme: args.text__theme,
      themeVariation: args.text__theme__variation,
      width: args.text__width,
    }),
  ),
  args: {
    text__content: 'A short paragraph inside a composed component.',
  },
};
