import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import docs from './container.docs.js';
import schema from './container.yml';
import containerTwig from './container.twig';

const { argTypes: widthOptions, args: widthDefaults } =
  createContainerWidthControls();
const { argTypes: themeOptions, args: themeDefaults } =
  createContainerThemeControls();

export default {
  title: 'Layout/Container',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(containerTwig),
  argTypes: {
    container__width: widthOptions.width,
    container__theme: themeOptions.theme,
    container__theme__variation: themeOptions.themeVariation,
    container__spacing: {
      control: 'select',
      options: schema.props.properties.container__spacing.enum.filter(Boolean),
      table: { category: 'Appearance' },
    },
    container__alignment: {
      control: 'select',
      options:
        schema.props.properties.container__alignment.enum.filter(Boolean),
      table: { category: 'Appearance' },
    },
    container__layout: {
      control: 'select',
      options: schema.props.properties.container__layout.enum.filter(Boolean),
      table: { category: 'Appearance' },
    },
    container__style: {
      control: 'select',
      options: schema.props.properties.container__style.enum.filter(Boolean),
      table: { category: 'Appearance' },
    },
  },
  args: {
    ...argsFromSchema(schema.props),
    container__width: widthDefaults.width,
    container__theme: themeDefaults.theme,
    container__theme__variation: themeDefaults.themeVariation,
    container__bg_color: true,
  },
};

export const Container = {};

export const Contained = {
  args: {
    container__layout: 'inline',
    container__style: 'contained',
    container__theme__variation: 'dark',
    container__width: 'wide',
  },
};
