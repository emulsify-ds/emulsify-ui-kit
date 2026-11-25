export default {
  description: {
    component: `
## Overview

Heading provides a semantic section title with an optional link.

## Anatomy & composition

Pass \`heading__content\` for the title and \`heading__url\` for its destination. Composed components can use \`heading__blockname\` to give the heading their own BEM class.

## Variants

Choose the HTML level with \`heading__level\`. The first \`h1\`–\`h6\` or \`display\` entry in \`heading__modifiers\` controls its appearance. The heading uses its semantic level's style by default.

## Accessibility

Set the level from the page structure. Use descriptive link text when the title navigates somewhere. The plain link inherits Base link and focus styles.

## Content guidelines

Use a concise, descriptive title. Use rendered phrasing content for emphasis inside the heading.

## Drupal usage

Include \`@components/heading/heading.twig\` by path and pass \`heading__content\` with the appropriate level. A link can receive additional anchor attributes through \`heading__link_attributes\`.

## Theming

Heading and link colors follow the local theme. Set \`--heading-color\` on a heading or its wrapper to customize its text color.

## Changes from 1.x

The template moved to \`heading/heading.twig\`. Rename \`heading\` and \`heading_url\` to \`heading__content\` and \`heading__url\`. The heading renders its own plain anchor and sets its visual style independently.
`,
  },
};
