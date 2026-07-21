import { renderTwig } from '@emulsify/core/storybook';
import template from './basic.twig';
import data from './basic.yml';

export default {
  title: 'Pages/Basic',
  render: renderTwig(template),
};

export const basic = {
  args: data,
};
