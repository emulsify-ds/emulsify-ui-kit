import { props } from './tags.component.yml';
import tagsTwig from './tags.twig';

import './tags.js';

const defaultItems = props.properties.items.data;

export default {
  title: 'Components/Tags',
  argTypes: {
    color: {
      name: 'Color override',
      control: 'select',
      options: ['', 'primary', 'dark', 'yellow', 'green'],
    },
  },
  args: {
    color: '',
  },
};

export const Tags = ({ color }) => {
  const items = defaultItems.map((item) =>
    item.url && color ? { ...item, color } : item,
  );
  return tagsTwig({ items });
};
