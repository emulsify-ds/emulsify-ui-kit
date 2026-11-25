import { renderTwig } from '@emulsify/core/storybook';

import template from './search.twig';
import { props } from './search.component.yml';

import './search';

/**
 * Storybook definition for Search component.
 */
export default {
  title: 'Components/Search',
  render: renderTwig(template),
  argTypes: {
    header__search_placeholder: {
      name: 'Placeholder',
      control: { type: 'text' },
    },
    header__search_label: {
      name: 'Search Button Label',
      control: { type: 'text' },
    },
  },
  args: {
    search__placeholder: props.properties.search__placeholder.data,
    search__label: props.properties.search__label.data,
  },
};

export const Search = {};
