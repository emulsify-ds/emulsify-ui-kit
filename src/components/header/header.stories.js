// Markup.
import template from './header.twig';

// Data.
import { props as mainMenuProps } from '../navigation/main/main.component.yml';
import { props as searchProps } from '../search/search.component.yml';

// JavaScript.
import '../navigation/base/menu-toggle/menu-toggle';
import '../navigation/main/main';
import '../search/search';

const mainMenuData = mainMenuProps.properties;
const searchData = searchProps.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Header',
  argTypes: {
    mainMenu: {
      name: 'Menu Items',
      control: { type: 'object' },
    },
    searchPlaceholder: {
      name: 'Search Placeholder',
      type: 'string',
    },
    showSearch: {
      name: 'Show Search',
      control: { type: 'boolean' },
    },
  },
  args: {
    mainMenu: mainMenuData.items.data,
    searchLabel: searchData.search__label.data,
    searchPlaceholder: searchData.search__placeholder.data,
    showSearch: true,
  },
};

export const Header = ({ mainMenu, searchPlaceholder, searchLabel, showSearch }) =>
  template({
    header__menu: mainMenu,
    header__branding: '<img src="assets/images/logo.svg" alt="Branding">',
    header__show_search: showSearch,
    header__search__placeholder: searchPlaceholder,
    header__search__label: searchLabel,
  });

