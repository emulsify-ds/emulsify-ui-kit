import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import { withStorybookContainer } from '../../util/storybookContainer.js';
import { createContainerThemeControls } from '../../util/storybookContainerControls.js';
import schema from './cta.component.yml';
import docs from './cta.docs.js';
import ctaTwig from './cta.twig';

const themeControls = createContainerThemeControls();
const { properties } = schema.props;

export default {
  title: 'Components/CTA',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(withStorybookContainer(ctaTwig)),
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
    cta__link: null,
    cta__icon: null,
  },
  argTypes: {
    ...themeControls.argTypes,
    cta__element: {
      control: 'select',
      options: properties.cta__element.enum.filter(Boolean),
    },
    cta__button_type: {
      control: 'select',
      options: properties.cta__button_type.enum.filter(Boolean),
      if: { arg: 'cta__element', eq: 'button' },
    },
    cta__modifiers: {
      control: 'check',
      options: ['primary', 'secondary', 'link', 'clean'],
      table: { category: 'Appearance' },
    },
    cta__icon_position: {
      control: 'select',
      options: properties.cta__icon_position.enum.filter(Boolean),
      if: { arg: 'cta__icon', truthy: true },
    },
    cta__url: { if: { arg: 'cta__element', eq: 'a' } },
    cta__new_tab: { if: { arg: 'cta__element', eq: 'a' } },
  },
};

export const Primary = {};

export const Secondary = {
  args: {
    cta__modifiers: ['secondary'],
    cta__icon: 'arrow-left',
    cta__icon_position: 'left',
    cta__text: 'Back to overview',
  },
};

export const Link = {
  args: {
    cta__modifiers: ['link'],
    cta__icon: 'arrow-right',
    cta__icon_position: 'right',
    cta__text: 'Explore the library',
  },
};

export const Clean = {
  args: {
    cta__modifiers: ['clean'],
    cta__text: 'Read more about the library',
  },
};

export const Button = {
  args: { cta__element: 'button', cta__text: 'Preview selection' },
  render: renderTwig(
    withStorybookContainer((args) => `<form>${ctaTwig(args)}</form>`),
  ),
};

export const NewTab = {
  args: {
    cta__modifiers: ['link'],
    cta__new_tab: true,
    cta__text: 'Visit example.com',
    cta__url: 'https://example.com/',
  },
};

export const RenderArray = {
  args: {
    cta__text: null,
    cta__url: null,
    cta__link: {
      '#type': 'link',
      '#title': 'View event details',
      '#url': '/events',
    },
  },
};
