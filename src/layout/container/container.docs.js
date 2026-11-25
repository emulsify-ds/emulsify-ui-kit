export default {
  description: {
    component: `
## Overview

Container sets the width, theme, and spacing for a page section.

## Anatomy & composition

The outer wrapper contains a prefix, an inner wrapper, and a suffix. The inner wrapper holds an optional introduction and the \`container__content\` block. Override \`container__intro__link\` to provide a custom introduction link.

## Variants

Choose \`narrow\`, \`content\`, \`wide\`, or \`full\` for width and \`left\`, \`center\`, or \`right\` for alignment. \`full\` fills the available width. The \`inline\` layout puts the introduction next to the content at the medium container breakpoint. \`contained\` paints the inner wrapper and adds inset padding. Spacing ranges from \`none\` to \`four\`. A \`-top\` or \`-bottom\` suffix applies the multiplier to that edge and leaves normal padding on the other edge.

## Accessibility

Choose a wrapper element appropriate to the page structure. Use a heading level from 2 to 6 that follows the page outline. A section anchor uses a stable, unique suffix. Test the reading order when placing the introduction after the content.

## Content guidelines

Use a short overline, a descriptive heading, and supporting text where needed. Give the introduction link a label that describes its destination.

## Drupal usage

Embed \`@layout/container/container.twig\` by path and fill \`container__content\`. Forward layout props from the embedding component and preserve any required props when isolating the Twig context.

## Theming

Pass the theme and its \`light\` or \`dark\` variation to set the local color roles. Without either prop, the container inherits the current roles. Enable \`container__bg_color\` to paint the active theme background or use a matching background on the ancestor. Rescope the width limits with \`--content-width-narrow\`, \`--content-width\`, \`--content-width-wide\`, or \`--content-width-full\`.

## Changes from 1.x

Use \`container__width\` and \`container__alignment\` in an embed. Move padding modifiers to \`container__spacing\`. The prefix renders above the inner wrapper. The introduction link renders when its URL and label are both supplied or when its block is filled.
`,
  },
};
