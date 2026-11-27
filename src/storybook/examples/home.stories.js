import { renderTwig } from '@emulsify/core/storybook';
import template from './home.twig';
import data from './home.yml';
import '../../components/navigation/base/menu-toggle/menu-toggle.js';
import '../../components/navigation/main/main.js';
import '../../components/offcanvas/offcanvas.js';
import '../../components/search/search.js';
import '../../components/header/header.js';

export default {
  title: 'Examples/Home',
  parameters: { layout: 'fullscreen' },
  render: renderTwig(template),
};

export const home = {
  args: data,
};
