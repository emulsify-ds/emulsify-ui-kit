import template from './line-height.twig';
import figma from '../../../config/configma.json';
import tokens from '../../../src/tokens/transformed.tokens.json';

const data = { lineHeight: tokens.lineHeights };

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
