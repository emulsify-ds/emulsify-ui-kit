import template from './border-tokens.twig';

import tokens from '../../../tokens/sd.tokens.json';

const data = { border: tokens.border };

export default {
  title: 'Tokens/Border',
};

export const Border = () => template(data);
