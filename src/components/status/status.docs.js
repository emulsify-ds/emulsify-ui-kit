export default {
  description: {
    component: `
## Overview

Status displays feedback such as confirmations, warnings, and errors.

## Anatomy & composition

Each group contains a visible type label, a decorative icon, and one or more messages. An optional dismiss action sits outside the live region.

## Variants

Choose \`info\`, \`success\`, \`warning\`, or \`error\`. The Drupal \`status\` key uses the success variant and \`danger\` uses error.

## Accessibility

Info and success use \`role="status"\`. Warning and error use \`role="alert"\`. Use alerts for feedback that needs immediate attention. Messages are readable without JavaScript. Dismissing a message moves focus to a remaining dismiss button or to the message group wrapper.

## Content guidelines

Explain what happened and include a specific next step when a problem needs to be resolved. Keep messages brief and avoid relying on the color of the box.

## Drupal usage

Pass the Drupal message list as \`status__messages\` and translated status headings as \`status__labels\` when needed. Set \`status__dismissible\` for feedback people can dismiss.

## Theming

Status inherits the surrounding light or dark theme. Override \`--status-background\` on the wrapper to customize its fill.

## Changes from 1.x

Use \`status__messages\` in place of \`message_list\`, and \`status__attributes\` to customize the wrapper. Variant selectors use \`data-status-type\`.
`,
  },
};
