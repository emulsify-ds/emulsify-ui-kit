import template from './spacing.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { spacing: tokens.spacing };

export default {
  title: 'Tokens/Spacing',
};

export const Spacing = () => template(data);

Spacing.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.spacing,
  },
};
