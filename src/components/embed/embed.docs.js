export default {
  description: {
    component: `
## Overview

Display a responsive iframe or a composed widget within a section.

## Anatomy & composition

Container supplies an optional heading and introduction. The media box sizes the iframe, and an optional caption appears below it.

## Variants

Choose 16:9, 4:3, square, or a custom positive ratio such as 21 / 9. Custom ratios accept a positive number or two positive numbers separated by a slash.

## Accessibility

Give each iframe a short title that identifies its content. For example, use “Library entrances map”. Embed omits media with an absent or blank iframe title. The embedded service supplies its own keyboard and screen-reader experience.

## Content guidelines

Use the introduction to explain why the embed is useful. Use captions for context such as the coverage area or recording date.

## Drupal usage

Pass \`embed__src\` with \`embed__title\` to generate a lazy-loaded iframe. For widgets that need provider markup, pass trusted or sanitized markup in \`embed__iframe\` or supply template-authored markup in the \`embed__content\` slot. The title check verifies the attribute. Sanitize CMS input before passing it to Embed. The slot takes priority, followed by markup from the prop and then the generated iframe.

## Theming

Set the shared container width, spacing, background, and theme props. Captions use the active body color and the caption type scale.

## Changes from 1.x

The \`embed_content\` prop becomes \`embed__iframe\`. Rename the \`embed_content\` slot to \`embed__content\`, and use \`embed__container__modifiers\` for Container modifiers.
`,
  },
};
