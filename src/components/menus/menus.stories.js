import breadcrumb from './breadcrumbs/breadcrumbs.twig';
import inlineMenu from './inline/inline-menu.twig';
import mainMenu from './main-menu/main-menu.twig';
import socialMenu from './social-menu/social-menu.twig';

import breadcrumbsDataProps from './breadcrumbs/breadcrumbs.component.yml';
import inlineMenuDataProps from './inline/inline-menu.component.yml';
import mainMenuDataProps from './main-menu/main-menu.component.yml';
import socialMenuDataProps from './social-menu/social-menu.component.yml';

import './main-menu/main-menu';

const breadcrumbsData = breadcrumbsDataProps.props.properties.breadcrumb.data;
const inlineMenuData =
  inlineMenuDataProps.props.properties.inline_menu_items.data;
const mainMenuData = mainMenuDataProps.props.properties.menu_items.data;
const socialMenuData =
  socialMenuDataProps.props.properties.social_menu_items.data;

/**
 * Storybook Definition.
 */
export default { title: 'Components/Menus' };

export const breadcrumbs = () => breadcrumb({ breadcrumb: breadcrumbsData });

export const inline = () => inlineMenu({ inline_menu_items: inlineMenuData });

export const main = () => mainMenu({ menu_items: mainMenuData });

export const social = () => socialMenu({ social_menu_items: socialMenuData });
