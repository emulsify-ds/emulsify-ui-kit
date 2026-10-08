import linkGroupTwig from './link-group.twig';
import { mapDataToTwig } from '../../util/dataTransformers.js';

import { props } from './link-group.component.yml';

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Link Group',
  argTypes: {
    link_group__display: {
      name: 'Display',
      control: { type: 'select' },
      options: props.properties.link_group__display.enum,
    },
    link_group__width: {
      name: 'Width',
      control: { type: 'select' },
      options: props.properties.link_group__width.enum,
    },
    link_group__alignment: {
      name: 'Alignment',
      control: { type: 'select' },
      options: props.properties.link_group__alignment.enum,
    },
    link_group__heading_level: {
      name: 'Heading level',
      control: { type: 'select' },
      options: props.properties.link_group__heading_level.enum,
    },
    link_group__heading: { name: 'Heading', type: 'string' },
    link_group__text: { name: 'Intro text', type: 'string' },
    link_group__bg_color: { name: 'Background color', type: 'boolean' },
    link_group__items: { table: { disable: true } },
  },
  args: mapDataToTwig(props.properties),
};

export const LinkGroup = (args) => linkGroupTwig(args);
