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
    container__heading: {
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
    container__bg_color: false,
    container__component_width: 'standard',
    container__modifiers: '',
    container__component_alignment: 'center',
    container__heading: 'This is an example container heading',
    container__text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget eleifend ex, non ullamcorper tellus. Nullam in lectus a nulla feugiat ultricies in sed lectus. Maecenas tincidunt eu massa sit amet molestie.',
  },
};
