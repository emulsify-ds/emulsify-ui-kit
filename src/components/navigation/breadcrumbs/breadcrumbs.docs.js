export default {
  description: {
    component: `
## Overview

Breadcrumbs show the current page's location in the site hierarchy.

## Anatomy & composition

An ordered list begins with the highest-level ancestor. The final item identifies the current page.

## Variants

The trail wraps at narrow widths, including with long labels.

## Accessibility

The landmark defaults to “Breadcrumb”. Ancestors use native links when a URL is available, and the final item has \`aria-current="page"\`. Separators are decorative.

## Content guidelines

Use short page titles and preserve the site's ancestor order.

## Drupal usage

Pass the Drupal breadcrumb array as \`breadcrumbs__items\`, with \`text\` and an optional \`url\` on each item. Include the current page as the last item.

## Theming

The trail inherits text, link, and focus colors from the active theme. Use a shared Container around it when the page needs a width or background.

## Changes from 1.x

Use \`breadcrumbs__items\` as the canonical input. The responsive wrapping trail replaces the older mobile disclosure and horizontal scroll controls.
`,
  },
};
