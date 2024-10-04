import template from './breakpoints.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

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
