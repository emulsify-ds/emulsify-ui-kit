export default {
  description: {
    component: `
## Overview

List groups related items in a semantic ordered or unordered list.

## Anatomy & composition

Pass strings or item objects containing content. An item can supply a list of children under its \`children.items\` key. Use the \`list__content\` slot for composed list items.

## Variants

Choose \`ol\` for sequences and \`ul\` for groups. The \`plain\` modifier hides markers. The \`inline\` modifier groups items in a wrapping row when space permits.

## Accessibility

Use ordered lists when order matters. Plain and inline lists preserve list semantics for assistive technology. Use a descriptive link label when an item contains a link.

## Content guidelines

Keep items parallel in tone and structure. Use nested lists when child items depend on their parent.

## Drupal usage

Include \`@components/list/list.twig\` with an isolated context. Pass \`list__items\` or use the \`list__content\` slot with list items. Use \`@components/list/_list-item.twig\` for composed items.

## Theming

Default lists use the body color role and the shared spacing scale. Provide a block name or base class for a marker-free list with component-specific styling.

## Changes from 1.x

Use the singular List directory. Rename \`list__addition_classes\` to \`list__additional_classes\`. Marker styling is scoped to the component, and ordered lists display markers by default.
`,
  },
};
