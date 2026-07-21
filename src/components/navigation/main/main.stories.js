import { renderTwig } from '@emulsify/core/storybook';
import mainMenuDataProps from './main.component.yml';
import mainNavTwig from './main.twig';

import '../base/menu-toggle/menu-toggle';
import './main';

const { properties } = mainMenuDataProps.props;

export default {
  title: 'Components/Navigation/Main',
  render: renderTwig(mainNavTwig),
  argTypes: {
    items: {
      name: 'Menu Items',
      control: 'object',
    },
  },
};

export const main = {
  args: {
    items: properties.items.data,
  },
};
