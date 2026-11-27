export default {
  description: {
    component: `
## Overview

Placeholder labels a sample region in a layout preview.

## Anatomy & composition

A neutral wrapper provides the border and spacing. A text element labels the area.
Use Placeholder inside Container or Grid to show how available space is allocated.

## Variants

Set \`placeholder__text\` to identify the region. Add BEM modifiers or classes when
the surrounding example needs a distinct presentation.

## Accessibility

The visible label describes the area even when styling is unavailable.
Use the surrounding template to provide any headings and landmarks.

## Content guidelines

Keep labels short and name what the finished layout would contain, such as
"Main content" or "Related links". Use actual content for published pages.

## Drupal usage

\`\`\`twig
{% include '@layout/placeholder/placeholder.twig' with {
  placeholder__text: 'Main content'|t,
} only %}
\`\`\`

## Theming

Placeholder uses the active theme's body color for its label and dashed border.

## Changes from 1.x

Pass \`placeholder__text\` and \`placeholder__modifiers\` in place of
\`place_holder\` and \`place_holder__modifiers\`. Select \`.placeholder\` and
\`.placeholder__content\` in custom styles.
`,
  },
};
