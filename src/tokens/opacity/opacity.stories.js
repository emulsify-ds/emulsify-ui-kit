import template from './opacity.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { opacity: tokens.opacity };

export default {
  title: 'Tokens/Opacity',
};

export const Opacity = () => template(data);

Opacity.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.opacity,
  },
};
