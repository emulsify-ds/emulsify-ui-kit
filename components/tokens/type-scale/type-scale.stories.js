import template from './type-scale.twig';
import tokens from '../../../tokens/sd.tokens.json';

const data = { fontSize: tokens.fontSize };

export default {
  title: 'Tokens/Type Scale',
};

export const TypeScale = () => template(data);
