import { renderTwig } from '@emulsify/core/storybook';
import template from './home.twig';
import data from './home.yml';

export default {
  title: 'Pages/Home',
  render: renderTwig(template),
};

export const home = {
  args: data,
};
