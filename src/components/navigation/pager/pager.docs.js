export default {
  description: {
    component: `
## Overview

Pager helps users move through a list of results spread across several pages.

## Anatomy & composition

A navigation landmark contains optional first and previous links, numbered pages, and optional next and last links.

## Variants

Use a full pager for numbered links and a mini pager when Views only provides adjacent pages. Ellipses indicate omitted page numbers.

## Accessibility

The landmark defaults to “Pagination”. The current page has \`aria-current="page"\`. Directional controls have visually hidden labels and visible symbols, and all links remain in the normal tab order.

## Content guidelines

Keep the same order and number range across the results pages. Give multiple pagers distinct landmark names.

## Drupal usage

Pass Drupal's pager data as \`pager__items\`, \`pager__current\`, and \`pager__ellipses\`. Views can supply its current page in \`pager__items.current\` when it omits the numbered page array. Set \`pager__label\` for a distinct navigation label.

## Theming

Pager uses the active theme's text, link, and focus roles. The links wrap at narrow widths.

## Changes from 1.x

Use the prefixed props as the canonical inputs. The current page is a text marker. The five Storybook configurations now use examples in \`pager.component.yml\`.
`,
  },
};
