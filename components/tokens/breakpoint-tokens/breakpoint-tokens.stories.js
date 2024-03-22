import template from './breakpoint-tokens.twig';
import figma from '../../../.storybook/configma.json';
import tokens from '../../../src/tokens/transformed.tokens.json';

const data = { breakpoint: tokens.breakpoint };

export default {
  title: 'Tokens/Breakpoints',
};

export const Breakpoints = () => template(data);

Breakpoints.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.breakpoint,
  },
};
