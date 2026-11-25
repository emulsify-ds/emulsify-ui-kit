import { renderTwig } from '@emulsify/core/storybook';
import docs from './basic.docs.js';
import template from './basic.twig';
import data from './basic.yml';

export default {
  title: 'Examples/Basic',
  tags: ['autodocs'],
  parameters: { docs },
  render: renderTwig(template),
};

export const basic = {
  args: data,
};
