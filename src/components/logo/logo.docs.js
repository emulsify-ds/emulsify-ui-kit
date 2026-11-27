export default {
  description: {
    component: `
## Overview

Logo presents an organization's mark in a header, footer, or other branded area.

## Anatomy & composition

The component renders an image. A supplied destination wraps the image in a native link.

## Variants

Use a linked logo for site navigation or a static logo for branding. The \`header\` and \`footer\` modifiers constrain the logo to preset maximum widths.

## Accessibility

Supply a text alternative on every logo. For a linked logo, describe the destination, such as “Emulsify UI Kit home”. The image text provides the link name.

## Content guidelines

Use the brand name in the text alternative. Choose an image asset that remains legible on the surrounding surface.

## Drupal usage

Pass the image URL and text alternative as \`logo__src\` and \`logo__alt\`. Set \`logo__url\` when the logo should navigate. Intrinsic dimensions reserve the space before the image loads.

## Theming

Use \`--logo-max-width\` to constrain the mark. The link focus indicator uses the active theme.

## Changes from 1.x

Use \`logo__src\` and \`logo__alt\` in place of \`image_src\` and \`image_alt\`. Supply \`logo__url: '/'\` to link to the home page.
`,
  },
};
