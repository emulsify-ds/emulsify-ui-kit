export default {
  description: {
    component: `
## Overview

Table presents data with relationships across rows and columns.

## Anatomy & composition

An optional caption describes the table. The head, body, and foot contain rows of column headers, row headers, and data cells.

## Variants

Pass footer cells for totals and an empty message when no rows are available. Wrap wide tables in the same component so their content scrolls within the available width.

## Accessibility

Choose a concise caption. Head cells are column headers by default. Set \`tag: 'th'\` on body or footer cells that label a row. Supply a valid \`scope\` for grouped headers. When the table overflows, the scroll wrapper becomes a focusable region named by its caption or \`table__scroll_label\` so keyboard users can scroll it.

## Content guidelines

Use short labels and put units in headers when they apply to an entire column. Use the caption to identify the table's subject.

## Drupal usage

Pass Drupal's header, rows, footer, and caption variables as \`table__header\`, \`table__rows\`, \`table__footer\`, and \`table__caption\`. Rows keep their \`cells\` arrays. Use \`table__attributes\` for attributes on the table and add \`table__scroll_label\` when a caption does not identify the scroll region.

## Theming

The table inherits the surrounding theme. Override \`--table-header-background\` and \`--table-stripe-background\` to change the surfaces.

## Changes from 1.x

Use the singular \`table\` component and the \`table__\` prop prefix. Apply cell styling through \`.table__cell\` or the native header and footer elements.
`,
  },
};
