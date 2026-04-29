import template from './borders.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { border: tokens.border };

export default {
  title: 'Tokens/Borders',
};

export const Borders = () => template(data);

Borders.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.border,
  },
};
