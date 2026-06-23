import { renderTwig } from '@emulsify/core/storybook';
import logoTwig from './logo.twig';

export default {
  title: 'Components/Logo',
  render: renderTwig(logoTwig),
};

export const logo = {};
