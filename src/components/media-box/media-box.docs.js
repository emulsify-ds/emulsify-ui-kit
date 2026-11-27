export default {
  description: {
    component: `
## Overview

Media Box places media below an optional heading and introduction in the shared section container.

## Anatomy & composition

Pass responsive image props, video props, or complete media markup in the \`media_box__media_content\` slot. Image and Video handle their own captions and credits. Include any caption or credit within composed slot markup.

## Variants

Select \`image\` or \`video\` with \`media_box__type\`. For video, choose \`html5\` for native sources or \`embed\` for a player URL.

## Accessibility

Provide meaningful alt text for images or mark them decorative. Choose a heading level that fits the page outline. Name videos and supply captions and a transcript when the content needs them. Check that any controls in composed media work with a keyboard and have visible focus.

## Content guidelines

Keep the introduction short. Use captions to explain how the media relates to the section and credits to identify the source.

## Drupal usage

\`\`\`twig
{{ include('@components/media-box/media-box.twig', {
  media_box__heading: heading,
  media_box__image__src: image_url,
  media_box__image__alt: image_alt,
  media_box__image__caption: caption,
}, with_context: false) }}
\`\`\`

## Theming

Set container width, spacing, background, theme, and theme variation with the shared section props. Supply a page-unique \`media_box__id\` for a stable section anchor.

## Changes from 1.x

Rename overrides of the \`media_box__media\` slot to \`media_box__media_content\`. Supply an image source or a video source explicitly. The old \`media_box__media\` prop can still supply an image URL.
`,
  },
};
