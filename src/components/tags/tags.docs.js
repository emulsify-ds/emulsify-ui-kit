export default {
  description: {
    component: `
## Overview

Tags label related topics. A tag can also link to a page or filtered list for its topic.

## Anatomy & composition

The component renders an unordered list. Each item contains a text label or a link. Use the \`tags__items_content\` slot to supply composed list items.

## Variants

Tags have an outline by default. Set an item's \`color\` to \`primary\`, \`dark\`, \`yellow\`, or \`green\` for a theme tint. A CSS color also works as a custom tint when the Drupal behavior is attached.

## Accessibility

Tags preserve list semantics with markers hidden. Links have a visible underline and focus indicator. Static labels stay outside the tab order. Labels use theme foreground colors, including when an accent is present.

## Content guidelines

Use short, specific topic names. Make the label describe the destination when the tag links somewhere.

## Drupal usage

Include \`@components/tags/tags.twig\` with an isolated context and pass \`tags__items\`. Set \`title\` for each item and include \`url\` for linked topics. Load the component's behavior and Drupal once for custom tints.

## Theming

The component inherits the theme and uses its body, background, and focus roles. For local adjustments, scope \`--tags-foreground\`, \`--tags-background\`, or \`--tags-border-color\`. Verify contrast when overriding these values.

## Changes from 1.x

Rename \`items\` to \`tags__items\`, the \`tags__items\` block to \`tags__items_content\`, and \`tags__addition_classes\` to \`tags__additional_classes\`. Use \`tags__blockname\` or \`tags__additional_classes\` in place of \`tags__base_class\`. Color values tint the background while the theme controls the text color.
`,
  },
};
