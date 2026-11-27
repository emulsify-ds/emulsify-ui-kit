export default {
  description: {
    component: `
## Overview

Text presents a complete formatted field inside a section container.

## Anatomy & composition

Pass processed markup through \`text__content\` or fill \`text__formatted_content\`. The wrapper supports ordinary headings, paragraphs, lists, quotations, and other HTML text elements.

## Variants

The whole-field component accepts shared container width, theme, alignment, and spacing. Use \`@components/text/_text.twig\` to render one paragraph, division, or span inside a composed component.

## Accessibility

Use heading levels that follow the page outline. Use real lists and descriptive anchor text. Preserve the emphasis and structure of the document when preparing the field.

## Content guidelines

Break longer content into short sections with descriptive headings. Use a divider between related groups where the transition is meaningful.

## Drupal usage

Pass a rendered text field or a value Drupal has processed through a text format. For a single composed element, pass \`text__element\` and the element's content to the partial with an isolated Twig context.

## Theming

The wrapper uses theme roles for body text and headings. The Base stylesheet supplies plain link styles. Set \`--formatted-text-color\` to customize the wrapper's body text color.

## Changes from 1.x

The whole-field template stays at \`text/text.twig\` and uses \`text__formatted_content\` for its slot. Replace the previous typography element and paragraph templates with \`text/_text.twig\`. The partial defaults to a paragraph, so set \`text__element: div\` for block-level markup.
`,
  },
};
