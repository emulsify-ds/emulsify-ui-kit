import { renderTwig } from '@emulsify/core/storybook';

import containerTwig from './container.twig';

export default {
  title: 'Layout/Container',
  render: renderTwig(containerTwig),
  argTypes: {
    container__bg_color: {
      name: 'Background Color',
      control: 'boolean',
    },
    container__component_width: {
      name: 'Container Width',
      control: 'select',
      options: ['compressed', 'standard', 'extended', 'max', 'full'],
    },
    container__modifiers: {
      name: 'Container Spacing',
      control: 'select',
      options: ['no-spacing', 'two-spacing'],
    },
    container__component_alignment: {
      name: 'Component Alignment',
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    layout: {
      name: 'Component Layout',
      options: ['inline', 'stacked'],
      type: 'select',
    },
    heading: {
      name: 'Container Heading',
      control: 'text',
    },
    container__text: {
      name: 'Container Text',
      control: 'text',
    },
  },
};

export const container = {
  args: {
    backgroundColor: false,
    width: 'content',
    spacing: '',
    alignment: 'center',
    layout: 'inline',
    heading: 'This is an example container heading',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget eleifend ex, non ullamcorper tellus. Nullam in lectus a nulla feugiat ultricies in sed lectus. Maecenas tincidunt eu massa sit amet molestie.',
  },
};

// Component Examples
export const container = ({
  backgroundColor,
  width,
  spacing,
  alignment,
  layout,
  heading,
  text,
}) =>
  containerTwig({
    container__bg_color: backgroundColor,
    container__component_width: width,
    container__modifiers: [spacing],
    container__component_alignment: alignment,
    container__layout: layout,
    container__heading: heading,
    container__text: text,
  });
