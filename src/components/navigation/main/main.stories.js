// Markup.
import mainNavTwig from './main.twig';

// Data.
import mainMenuDataProps from './main.component.yml';

// JavaScript
import '../base/menu-toggle/menu-toggle';
import './main';

const mainNavData = mainMenuDataProps.props.properties.items.data;

/**
 * Storybook Definition.
 */
export default { title: 'Components/Navigation/Main' };

export const Main = () => mainNavTwig({ items: mainNavData });
