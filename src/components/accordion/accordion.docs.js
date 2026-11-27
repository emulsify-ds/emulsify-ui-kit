export default {
  description: {
    component: `
## Overview

Use Accordion for related content that readers can expand independently.

## Anatomy & composition

Each item is a heading followed by its panel. After Drupal attaches the behavior, the heading contains a CTA button that controls the panel through \`aria-expanded\` and \`aria-controls\`.

## Variants

Set \`accordion__show_controls: true\` to offer Expand all and Collapse all buttons.

## Accessibility

Enter and Space toggle the focused disclosure. Tab and Shift+Tab follow the document order. Collapsed panels use the native \`hidden\` attribute. Server markup exposes the headings and panels while the buttons are hidden. A matching URL fragment opens its item and any containing accordion items. [WAI-ARIA Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)

## Content guidelines

Write headings that help readers predict the panel contents. Set the item heading level to fit the surrounding document outline.

## Drupal usage

Pass a unique \`accordion__id\` for each instance. Pass \`id\`, \`heading\`, and \`content\` for each item. Use identifiers with letters and digits separated by single hyphens or underscores. Link to an item using \`#accordion-{accordion__id}--{item.id}\`. To compose disclosures in a slot, use \`accordion__items_content\` and include \`@components/accordion/_accordion-item.twig\` with the accordion ID and a distinct item ID.

## Theming

Set the shared container width, spacing, and theme props. The buttons and dividers inherit the active theme's color roles.

## Changes from 1.x

Use \`heading\` and \`content\` in each item in place of \`accordion__item__heading\` and \`accordion__item__content\`. Rename the \`accordion__items\` slot to \`accordion__items_content\`. If you override the item partial's body block, use \`accordion__item__body_content\`. Set \`accordion__show_controls\` explicitly for bulk controls. Item links use stable, caller-supplied IDs.
`,
  },
};
