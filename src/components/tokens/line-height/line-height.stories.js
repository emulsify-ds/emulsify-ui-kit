import template from './line-height.twig';
import tokens from '../../../tokens/transformed.tokens.json';
import figma from '../../../../.storybook/configma.json';

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
