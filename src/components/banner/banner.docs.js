export default {
  description: {
    component: `
## Overview

Use a banner to introduce a section and point readers to an action.

## Anatomy & composition

The section has an optional overline, heading, supporting copy, up to two CTAs, and media. Supply a responsive image, a video, or composed media in the media slot. The caption slot adds a figure caption when media is present.

## Variants

The copy stacks above the media in narrow sections. At the medium container breakpoint, \`banner__media_alignment\` places media on either side. \`banner__alignment\` aligns the copy and actions.

## Accessibility

Choose a heading level that fits the page. Supply a unique \`banner__id\` to make the heading label the section. Give informative images meaningful alternative text and mark decorative images accordingly. Give video a descriptive title and supply captions for meaningful audio. Video uses native controls and starts paused.

## Content guidelines

Keep the heading short. Use the supporting copy to explain why readers should follow the action. Give each action a distinct destination and descriptive label.

## Drupal usage

Render \`banner\` with the consuming theme's SDC prefix. Supply \`banner__ctas\` as a list of items with \`content\` and \`url\`. Use an entity or field identifier as \`banner__id\` and link to \`#section-{id}\`. For custom media, fill \`banner__media_content\` and optionally \`banner__media_caption_content\`.

## Theming

Set the shared section width, spacing, and theme props. The banner inherits the surrounding color roles when the theme props are omitted. Scope \`--banner-gap\` or \`--banner-media-radius\` to a banner to customize its layout.

## Changes from 1.x

Use \`banner__heading_level\`, \`banner__ctas\`, \`banner__image__src\`, and \`banner__video__sources\`. Migrate media and caption overrides to the new slot names. Media sits beside the copy at wide widths and video plays on demand.
`,
  },
};
