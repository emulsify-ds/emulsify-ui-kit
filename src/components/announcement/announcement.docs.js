export default {
  description: {
    component: `
## Overview

Use Announcement for a short notice such as a schedule change or temporary service update.

## Anatomy & composition

The notice has a heading and message. It can include a decorative icon, up to two CTA links, and a dismissal button.

## Variants

Use the default surface or choose \`announcement__variant: 'tint'\` to emphasize the notice. Both inherit the surrounding theme.

## Accessibility

Choose a heading level that fits the page. The optional icon is decorative. The dismissal action is a named native button that appears when Drupal behaviors attach. The notice and its links stay available without JavaScript.

## Content guidelines

Explain what changed and when. Use descriptive action labels. Offer dismissal for notices that users can safely hide for the current page visit.

## Drupal usage

Render \`announcement\` with the consuming theme's SDC prefix. Pass one or two \`{ content, url, icon?, icon_position? }\` objects in \`announcement__ctas\` and set \`announcement__dismissible\` when appropriate.

## Theming

Use the inherited light or dark theme. Set \`--announcement-background\` or \`--announcement-accent\` on the notice to override the surface or accent and verify contrast.

## Changes from 1.x

Move the title to \`announcement__heading\` and navigation actions to \`announcement__ctas\`. Use an icon name for \`announcement__icon\`. For a tinted light or dark notice, use the tint variant in the appropriate theme.
`,
  },
};
