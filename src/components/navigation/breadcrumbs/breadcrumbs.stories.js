// Markup.
import breadcrumbsTwig from './breadcrumbs.twig';

// Data.
import breadcrumbsDataProps from './breadcrumbs.component.yml';

// JavaScript
import './breadcrumbs';

const breadcrumbsData = breadcrumbsDataProps.props.properties.breadcrumb.data;

/**
 * Storybook Definition.
 */
export default { title: 'Components/Navigation/Breadcrumbs' };

export const Breadcrumbs = () =>
  breadcrumbsTwig({ breadcrumbs_items: breadcrumbsData });
