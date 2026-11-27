export default {
  description: {
    component: `
## Overview

Tabs group related content and show one panel at a time when JavaScript is available.

## Anatomy & composition

A named tab list contains native buttons. Each button controls one panel, and the panel takes its accessible name from that button. The server renders all panels with their headings and hides the tab list until the behavior attaches.

## Variants

The horizontal list wraps onto additional lines in a narrow container. Use \`tabs__active\` to choose the initial tab when the URL does not point to a tab or panel.

## Accessibility

Tab enters the list at the selected tab and then moves to the current panel. Left and Right Arrow move focus and select the next tab in that direction, wrapping at the ends. Home and End select the first or last tab. Up and Down Arrow preserve normal browser scrolling. [WAI-ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

## Content guidelines

Use concise, distinct labels. Keep all panel content local so keyboard selection updates immediately. Provide a visible heading for the set or a specific \`tabs__label\`.

## Drupal usage

Provide a page-unique \`tabs__id\` and stable, unique \`id\` values for items. Tab IDs use \`tabs-{tabs__id}:tab:{id}\`. Panel IDs use \`tabs-{tabs__id}:panel:{id}\`. Link to a panel ID for a direct link. Use the \`tabs__panels_content\` slot for custom panels with matching IDs, \`role="tabpanel"\`, \`aria-labelledby\`, and \`tabindex="0"\`.

## Theming

Tabs inherit the active light or dark theme. The shared Container props set the width, alignment, theme, and spacing.

## Changes from 1.x

Pass \`tabs__items\` in place of \`tabs\`. Each item's \`tab__label\`, \`tab__content\`, and optional \`tab__icon\` become \`label\`, \`content\`, and \`icon\`. Supply stable IDs and replace the former \`tab__content\` slot with \`tabs__panels_content\`.
`,
  },
};
