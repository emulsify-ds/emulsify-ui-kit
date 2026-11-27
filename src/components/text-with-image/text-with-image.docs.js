export default {
  description: {
    component: `
## Overview

Text with Image pairs a heading and formatted copy with a related image inside a section.

## Anatomy & composition

The copy can include an overline and up to two actions. Supply image props for the built-in Image component or fill the \`text_with_image__media_content\` slot with composed media. Image captions and credits render in a figure.

## Variants

Set \`text_with_image__media_alignment\` to \`left\` or \`right\`. At the medium container breakpoint, \`text_with_image__focus\` assigns equal columns or gives the image or text more width. Below that breakpoint, the copy stacks above the media.

## Accessibility

Choose the heading level from the page outline. Provide descriptive alternative text for an informative image. Set \`text_with_image__image__decorative\` only for an image whose removal leaves the meaning unchanged. The copy comes first in reading and focus order for either alignment. Keep any controls in composed media operable by keyboard.

## Content guidelines

Use a concise heading, a short block of formatted copy, and media that supports the topic. Give each action a distinct label that describes its destination.

## Drupal usage

Include \`@components/text-with-image/text-with-image.twig\` by path and pass the heading and processed text field. Use the shared container props for width, theme, vertical spacing, and a section anchor. Pass action items as objects with \`content\`, \`url\`, and optional \`icon\` and \`icon_position\` keys.

## Theming

The shared container applies the theme and inherited color roles. Set \`--grid-spacing\` to customize the space between the columns.

## Changes from 1.x

Use \`text_with_image__media_alignment\` for the old position prop and \`text_with_image__media_content\` for the old image slot. Pass multiple actions through \`text_with_image__ctas\`. Captions and credits use the image props and appear when supplied. Provide a source and alternative text or fill the media slot to render media.
`,
  },
};
