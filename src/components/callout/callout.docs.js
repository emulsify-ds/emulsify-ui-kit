export default {
  description: {
    component: `
## Overview

Use a Callout to highlight a useful next step in a page.

## Anatomy & composition

The section places an optional overline, heading, and supporting text before up to two CTAs.

## Variants

With two actions, the first is primary and the second is secondary. The section stacks on narrow layouts and places copy and actions next to each other when space allows.

## Accessibility

Choose a heading level that fits the page outline. Each action uses a native link, follows the source order, and inherits the CTA focus and target styles.

## Content guidelines

Use a short heading and descriptive action labels. Give the two actions distinct destinations.

## Drupal usage

Render \`callout\` with the consuming theme's SDC prefix. Supply \`callout__ctas\` as a list of items with \`content\` and \`url\`. Set \`callout__id\` to add a section anchor.

## Theming

Inherit the surrounding theme or set \`callout__theme\` and \`callout__theme__variation\`. Use the local \`--callout-background\` and \`--callout-radius\` properties to customize the panel.

## Changes from 1.x

Callout replaces Call to Action. Use the \`callout__\` prop prefix and the shared CTA and container props.
`,
  },
};
