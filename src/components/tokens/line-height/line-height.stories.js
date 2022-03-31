import template from './line-height.twig';
import tokens from '../../../tokens/sd.tokens.json';

const data = { lineHeight: tokens.lineHeights };

export default {
  title: 'Tokens/Line Heights',
};

export const LineHeights = () => template(data);
