import statsTwig from './stats-group.twig';

import { props } from './stats-group.component.yml';

const statsData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Stats Group',
  argTypes: {
    heading: {
      name: 'Intro Heading',
      type: 'string',
    },
    headingLevel: {
      name: 'Heading Level',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6'],
    },
    text: {
      name: 'Intro Text',
      type: 'string',
    },
    items: {
      name: 'Statistics',
      control: { type: 'object' },
    },
    gridColumns: {
      name: 'Column Number',
      control: { type: 'select' },
      options: ['1', '2', '3', '4'],
    },
    motion: {
      name: 'Motion',
      control: {
        type: 'boolean',
      },
    },
    width: {
      name: 'Container Width',
      control: { type: 'select' },
      options: {
        Compact: 'compact',
        Standard: 'standard',
      },
      table: {
        category: 'Container Controls',
      },
    },
    alignment: {
      name: 'Container Alignment',
      control: { type: 'select' },
      options: {
        Left: 'left',
        Center: 'center',
        Right: 'right',
      },
      table: {
        category: 'Container Controls',
      },
    },
    backgroundColor: {
      name: 'Background Color',
      control: {
        type: 'boolean',
      },
      table: {
        category: 'Container Controls',
      },
    },
  },
  args: {
    items: statsData.stats_group__items.data,
    heading: statsData.stats_group__heading.data,
    headingLevel: statsData.stats_group__heading_level.data,
    text: statsData.stats_group__content.data,
    gridColumns: '3',
    width: 'compact',
    alignment: 'center',
    backgroundColor: false,
    motion: false,
  },
};

export const statsGroup = ({
  heading,
  headingLevel,
  text,
  items,
  gridColumns,
  width,
  alignment,
  backgroundColor,
  motion,
}) =>
  statsTwig({
    stats_group__heading: heading,
    stats_group__heading_level: headingLevel,
    stats_group__content: text,
    stats_group__items: items,
    stats_group__bg_color: backgroundColor,
    stats_group__motion: motion,
    stats_group__grid_columns: gridColumns,
    stats_group__width: width,
    stats_group__alignment: alignment,
  });
