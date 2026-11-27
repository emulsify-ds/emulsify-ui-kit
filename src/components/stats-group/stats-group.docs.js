export default {
  description: {
    component: `
## Overview

Use Stats Group to present a small set of related measurements.

## Anatomy & composition

The section has an optional heading and introduction. Each grid item is a description list with the label as its term and the metric as its value.

## Variants

Choose up to six columns depending on the number of items. The grid reduces the number of columns when space is limited.

## Accessibility

Labels and values follow the same order on screen and in the document. Set the section heading level to match the page outline. Optional entrance motion respects reduced-motion preferences.

## Content guidelines

Use concise labels that tell readers what is measured. Include units and provide dates or context in the introduction when they affect interpretation.

## Drupal usage

Supply \`stats_group__items\` as a list of objects with \`metric\` and \`description\`. Use the \`stats_group__items_content\` slot for complete custom statistic items, preserving the label and value relationship.

## Theming

The section accepts the shared container props. Customize items with \`--stats-group-background\`, \`--stats-group-accent\`, and \`--stats-group-metric\`.

## Changes from 1.x

Use \`stats_group__width\` and \`stats_group__animate\` for width and motion. Metrics now use description-list values. The heading level applies to the group heading.
`,
  },
};
