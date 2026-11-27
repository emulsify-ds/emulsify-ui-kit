export default {
  description: {
    component: `
## Overview

Icon renders an SVG glyph from the UI Kit's icon assets.

## Anatomy & composition

Use the SVG on its own for a meaningful symbol or within a labeled control for decoration.

## Variants

Set \`icon__name\` to a filename from Base → Icons. Set \`icon__decorative\` when surrounding text names the action.

## Accessibility

Give a meaningful icon a concise title. Add a unique \`icon__id\` to generate title and description references. Icons without an instance ID use a direct accessible label. An unnamed icon is hidden from assistive technology. Label the control itself when an icon is its only visible content.

## Content guidelines

Use familiar symbols and add visible text when a symbol may have more than one meaning.

## Drupal usage

Include \`@components/icon/icon.twig\` with an isolated context. Register \`assets: assets\` under \`components.namespaces\` in the theme's \`.info.yml\` so Twig can load the inline artwork.

## Theming

The SVG inherits its text color. Set \`--icon-size\` on the icon or its context to change the default size.

## Changes from 1.x

The Icon directory and template names are singular. Replace the sprite partial include with the Icon template and pass a stable instance ID when you need title and description references. Use \`icon__additional_classes\` in place of \`icon__extra_class\`.
`,
  },
};
