export default {
  description: {
    component: `
## Overview

Code displays a literal snippet and preserves line breaks and indentation.

## Anatomy & composition

The panel contains a native preformatted element and a code element. Pass
literal source to \`code__content\` or fill \`code__snippet_content\` with
author-controlled syntax highlighting markup.

## Variants

The panel uses the surrounding light or dark theme. Long lines scroll inside
the panel.

## Accessibility

Tab to the labelled code region to scroll long lines with the keyboard.
Provide a distinct \`aria-label\` in \`code__attributes\` when several panels
appear together. Use text alongside an example when readers need an explanation.

## Content guidelines

Use short, readable examples. Include significant spaces and line breaks in
the source text.

## Drupal usage

Include \`@components/code/code.twig\` with an isolated context and pass
\`code__content\`. The component escapes literal code, including HTML tags.

## Theming

The foreground, border, and panel background use the surrounding color roles.
Pass an additional class when a particular panel needs local styling.

## Changes from 1.x

Include \`@components/code/code.twig\`. Rename the \`code_content\` prop to
\`code__content\` and the block to \`code__snippet_content\`.
`,
  },
};
