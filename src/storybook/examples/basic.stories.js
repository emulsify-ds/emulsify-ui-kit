import { renderTwig } from '@emulsify/core/storybook';
import docs from './basic.docs.js';
import template from './basic.twig';
import data from './basic.yml';
import { menu_items, social_menu_items } from './home.yml';
import '../../components/navigation/base/menu-toggle/menu-toggle.js';
import '../../components/navigation/main/main.js';
import '../../components/offcanvas/offcanvas.js';
import '../../components/search/search.js';
import '../../components/header/header.js';

export default {
  title: 'Examples/Basic',
  tags: ['autodocs'],
  parameters: { docs, layout: 'fullscreen' },
  render: renderTwig(template),
};

export const basic = {
  args: { ...data, menu_items, social_menu_items },
};
