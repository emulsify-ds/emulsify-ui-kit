// Component Twig
import containerTwig from './container.twig';

// Menu Location
export default {
  title: 'Layout/Container',
  argTypes: {
    backgroundColor: {
      name: 'Background Color',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    width: {
      name: 'Container Width',
      control: { type: 'select' },
      options: {
        Small: 'compressed',
        Medium: 'standard',
        Large: 'extended',
        Max: 'max',
        Full: 'full',
      },
    },
    spacing: {
      name: 'Container Spacing',
      control: { type: 'select' },
      options: {
        '0x Spacing': 'no-spacing',
        '1x Spacing': '',
        '2x Spacing': 'two-spacing',
      },
    },
    alignment: {
      name: 'Component Alignment',
      options: ['left', 'center', 'right'],
      type: 'select',
    },
    heading: {
      name: 'Container Heading',
      control: {
        type: 'text',
      },
    },
    text: {
      name: 'Container Text',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    backgroundColor: false,
    width: 'standard',
    spacing: '',
    alignment: 'center',
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
  heading,
  text,
}) =>
  containerTwig({
    container__bg_color: backgroundColor,
    container__component_width: width,
    container__modifiers: [spacing],
    container__component_alignment: alignment,
    container__heading: heading,
    container__text: text,
  });
