import { renderTwig } from '@emulsify/core/storybook';
import breadcrumbsDataProps from './breadcrumbs.component.yml';
import breadcrumbsTwig from './breadcrumbs.twig';

import './breadcrumbs';

const { properties } = breadcrumbsDataProps.props;

export default {
  title: 'Components/Navigation/Breadcrumbs',
  render: renderTwig(breadcrumbsTwig),
  argTypes: {
    breadcrumbs_items: {
      name: 'Breadcrumbs Items',
      control: 'object',
    },
  },
};

export const breadcrumbs = {
  args: {
    breadcrumbs_items: properties.breadcrumb.data,
  },
};
