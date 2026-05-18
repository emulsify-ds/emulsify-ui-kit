import template from './header.twig';
import { props } from './header.component.yml';
import './header';

const headerData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Header',
  argTypes: {
    menu: {
      name: 'Menu Items',
      control: { type: 'object' },
    },
    searchPlaceholder: {
      name: 'Search Placeholder',
      type: 'string',
    },
  },
  args: {
    menu: headerData.header__menu.data,
    searchPlaceholder: headerData.header__search_placeholder.data,
  },
};

export const Header = ({ menu, searchPlaceholder }) =>
  template({
    header__menu: menu,
    header__search_placeholder: searchPlaceholder,
    header__branding: '<img src="assets/images/logo.svg" alt="Branding">',
  });

