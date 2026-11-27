export default {
  description: {
    component: `
## Overview

Use Link Group to present a short list of related destinations.

## Anatomy & composition

An optional heading and introduction precede an unordered list of CTA links. Supply the list data or replace the generated list items with a slot.

## Variants

The button display wraps compact CTAs. The boxes display uses a full-width link per box and adds a second column when the container is wide enough.

## Accessibility

Both displays use native links in list order. Set \`link_group__nav_label\` to give an important group a distinct navigation landmark. Icons are decorative. Include any essential information in the visible link labels.

## Content guidelines

Use short labels that describe where each link goes. Group links that help readers accomplish a shared task.

## Drupal usage

Pass \`link_group__items\` as an array with a \`label\` and \`url\` per item. The button display accepts an optional \`icon\` and \`icon_label\`. For composed content, pass complete list items in the \`link_group__items_content\` slot.

## Theming

The container forwards width, alignment, spacing, anchor, and theme. A button group with its background enabled uses the shared contained style. Set \`--link-group-box-background\` on the list wrapper to override the box surface and check the resulting contrast.

## Changes from 1.x

Rename the \`link_group__items\` slot to \`link_group__items_content\`. The \`link_group__items\` prop keeps the same item keys and becomes optional for slot-only groups. Migrate custom styles from the legacy button and link components to CTA classes.
`,
  },
};
