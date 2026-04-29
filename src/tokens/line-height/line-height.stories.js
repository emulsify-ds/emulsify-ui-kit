import template from './line-height.twig';
import figma from '../../../config/configma.json';
import tokens from '../transformed.tokens.json';

const data = { lineHeight: tokens['line-height'] };

export default {
  title: 'Tokens/Line Height',
};

export const LineHeight = () => template(data);

LineHeight.parameters = {
  design: {
    type: 'figma',
    url: figma.url + figma.lineHeight,
  },
};
