import { renderTwig } from '@emulsify/core/storybook';

import listTwig from './list.twig';
import listData from './list.component.yml';

const { properties } = listData.props;

export default {
  title: 'Components/Typography/List',
  render: renderTwig(listTwig),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    list__items: { name: 'Items', control: 'object' },
    list__type: {
      name: 'Type',
      control: 'select',
      options: ['ul', 'ol'],
    },
  },
};

export const unordered = {
  args: {
    list__items: properties.list__items.data,
    list__type: 'ul',
  },
};

export const ordered = {
  args: {
    list__items: properties.list__items.data,
    list__type: 'ol',
  },
};
