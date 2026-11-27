export default {
  description: {
    component: `
## Overview

Blockquote presents quoted material with an optional attribution.

## Anatomy & composition

The figure contains a native blockquote and an optional caption. Set \`blockquote__quote\` for the quotation and use the attribution props for its source. Slots accept rendered quotation and attribution content.

## Variants

Set \`blockquote__style\` to \`bar-left\`, \`bar-right\`, or \`quote-left\` to choose its accent.

## Accessibility

Use this component for actual quotations. Keep the attribution distinct from the quoted text. The decorative quotation mark is hidden from assistive technology.

## Content guidelines

Preserve the wording of the original quotation. Name the speaker or source when known.

## Drupal usage

Include \`@components/blockquote/blockquote.twig\` by path. Pass rendered rich text as \`blockquote__quote\` or populate \`blockquote__quote_content\`.

## Theming

Text and the accent inherit local color roles. Set \`--blockquote-text-color\` or \`--blockquote-accent-color\` on the figure or its wrapper to customize them.

## Changes from 1.x

The typography quotation template and the standalone blockquote are now one component. Use \`blockquote__quote\` for the content prop and \`blockquote__quote_content\` for the slot. The attribution renders in a figure caption.
`,
  },
};
