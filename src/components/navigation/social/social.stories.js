import { renderTwig } from '@emulsify/core/storybook';

import socialNavTwig from './social.twig';
import socialNavDataProps from './social.component.yml';

const { properties } = socialNavDataProps.props;

export default {
  title: 'Components/Navigation/Social',
  render: renderTwig(socialNavTwig),
  argTypes: {
    items: {
      name: 'Social Items',
      control: 'object',
    },
  },
};

export const social = {
  args: {
    items: properties.items.data,
  },
};
