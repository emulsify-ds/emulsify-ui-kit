// Documentation on theming Storybook: https://storybook.js.org/docs/configurations/theming/

import { create } from '@storybook/theming';

export default create({
  base: 'dark',

  // UI
  appBg: '#00405B',
  appContentBg: '#005F89',
  appBorderColor: '#99D9F4',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Mona Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: 'white',
  textInverseColor: 'rgba(255,255,255,0.9)',
  textMutedColor: '#E6F5FC',

  // Toolbar default and active colors
  barTextColor: '#005F89',
  barSelectedColor: '#8B1E7E',
  barBg: '#CCECFA',

  // Form colors
  inputBg: 'red',
  inputBorder: 'silver',
  inputTextColor: '#00202E',
  inputBorderRadius: 4,
  
  // Branding
  brandTitle: 'Emulsify',
  brandUrl: 'https://emulsify.info',
  brandImage:
    'https://randyoest.com/random/emulsify-logo-sb.svg',
  brandTarget: '_self',
});
