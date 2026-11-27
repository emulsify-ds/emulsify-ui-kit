export default {
  description: {
    component: `
## Overview

Use Offcanvas for supporting content that opens from a button. The body is available inline before JavaScript initializes.

## Anatomy & composition

The component contains a CTA trigger and a native dialog. The heading names the dialog. A close CTA stays at the top, followed by the body and an optional footer.

## Variants

A pane opens at a viewport edge and leaves the surrounding page available. A modal is centered and makes the surrounding page inert.

## Accessibility

Opening the dialog moves focus to the close button unless the content sets an autofocus target. In a modal, Tab and Shift+Tab wrap within the dialog. Escape closes the modal or the focused pane. Closing returns focus to the trigger. The heading stays available as the accessible name when visually hidden. [WAI-ARIA APG Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

## Content guidelines

Give the dialog a heading that identifies its purpose. Use a trigger label that tells users what they will open. Keep the footer short so the body has room to scroll.

## Drupal usage

Supply a heading and body content. Set a unique \`offcanvas__id\` for each instance when headings repeat. Use \`offcanvas__body_content\` and \`offcanvas__footer_content\` to override the body and footer. Inline trigger content can use \`offcanvas__trigger_content\`. Attach Drupal behaviors to enable the dialog controls.

## Theming

Dialogs inherit the surrounding theme and can set \`offcanvas__theme__variation\`. Use the local \`--offcanvas-background\`, \`--offcanvas-backdrop\`, \`--offcanvas-pane-width\`, and \`--offcanvas-modal-width\` properties to adjust the presentation. Opening motion respects reduced-motion preferences.

## Changes from 1.x

The body and footer props remain \`offcanvas__content\` and \`offcanvas__suffix\`. Override the new slot names to supply custom markup. Use \`offcanvas__heading_level\` to set the heading level. Panes now leave the surrounding page interactive. Use the modal variant when the background must be inert.
`,
  },
};
