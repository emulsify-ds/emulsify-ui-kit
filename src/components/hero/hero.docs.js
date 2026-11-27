export default {
  description: {
    component: `
## Overview

Hero introduces a page or major section with a display heading, supporting copy, and up to two actions.

## Anatomy & composition

A section Container wraps the copy and optional media. The copy stays first in the reading order. Use the media slot for composed markup or use the built-in Image and Video props.

## Variants

Set the media type to image, video, or none. Place media on either side when the container is wide enough. The tall variant adds a minimum height to the wide layout. Set the heading level to match the page outline.

## Accessibility

Provide alternative text when an image adds information. An image without alternative text is decorative by default. Give informative video a descriptive title, captions for meaningful audio, and a transcript or description when required. Reserve background playback for decorative footage. It starts muted only when the viewer allows motion, responds to changes in that setting, and offers a visible play or pause button. The native controls work before the enhancement attaches. [WCAG Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)

## Content guidelines

Introduce the page in the heading and keep supporting text brief. Put the most important action first. Choose a silent clip and a useful still image for a background video. Put any essential information in the copy.

## Drupal usage

Pass a page-unique ID for the section anchor and the heading relationship. Map Image and Video props explicitly or pass rendered content through the media slot. Attach the Video behavior and Drupal once for enhanced background playback.

\`\`\`twig
{{ include('@components/hero/hero.twig', {
  hero__id: 'workshop-introduction',
  hero__heading: 'Find a workshop'|t,
  hero__heading_level: 1,
  hero__image__src: photo_url,
  hero__ctas: [{ content: 'Browse workshops'|t, url: workshops_url }],
}, with_context: false) }}
\`\`\`

## Theming

Pass the shared Container width, spacing, and theme props. The copy and controls use inherited theme roles.

## Changes from 1.x

Hero is new in 2.0. Use its built-in heading and media to replace a custom page-introduction layout.
`,
  },
};
