import template from './opacity-tokens.twig';

import tokens from '../../../tokens/sd.tokens.json';

const data = { opacity: tokens.opacity };

export default {
  title: 'Tokens/Opacity',
};

export const Opacity = () => template(data);
