import listTwig from './list.twig';
import { props } from './list.component.yml';

const listData = props.properties.list__items.data;

/**
 * Storybook Definition.
 */
export default { title: 'Components/Typography' };

export const ListUnordered = () => `
  <div class="text-field">
    ${listTwig({ list__items: listData })}
  </div>
`;

export const ListOrdered = () => `
<div class="text-field">
  ${listTwig({ list__items: listData, list__type: 'ol' })}
</div>
`;
