import template from './size-tokens.twig';

import tokens from '../../../tokens/sd.tokens.json';

const data = { size: tokens.size };

export default {
  title: 'Tokens/Size',
};

export const Size = () => template(data);
