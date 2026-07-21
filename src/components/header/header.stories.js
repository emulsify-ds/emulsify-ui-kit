// Markup.
import { renderTwig } from '@emulsify/core/storybook';
import headerTwig from './header.twig';

// Data.
import mainMenuData from '../navigation/main/main.component.yml';
import searchData from '../search/search.component.yml';

// JavaScript.
import '../navigation/base/menu-toggle/menu-toggle';
import '../navigation/main/main';
import '../search/search';

const mainMenuProps = mainMenuData.props.properties;
const searchProps = searchData.props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Header',
  render: renderTwig(headerTwig),
  argTypes: {
    header__menu: {
      name: 'Menu Items',
      control: { type: 'object' },
    },
    header__search__placeholder: {
      name: 'Search Placeholder',
      control: { type: 'text' },
    },
    header__search__label: {
      name: 'Search Label',
      control: { type: 'text' },
    },
    header__show_search: {
      name: 'Show Search',
      control: { type: 'boolean' },
    },
    header__branding: {
      name: 'Branding HTML',
      control: { type: 'text' },
    },
  },
};

export const header = {
  args: {
    header__menu: mainMenuProps.items.data,
    header__branding: '<img src="assets/images/logo.svg" alt="Branding">',
    header__show_search: true,
    header__search__placeholder: searchProps.search__placeholder.data,
    header__search__label: searchProps.search__label.data,
  },
};
