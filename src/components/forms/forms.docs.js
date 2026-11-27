export default {
  description: {
    component: `
## Overview

Forms supplies the native wrapper and styles for labelled inputs, text areas, select menus, checkboxes, and radios.

## Anatomy & composition

The form wraps existing fields and actions in the \`forms__fields_content\` slot. Use a fieldset with a legend for related controls and a CTA with the submit type for the primary action.

## Variants

The stories show native checkboxes, radio buttons, a select menu, and text inputs with inline help and an error.

## Accessibility

Connect each label to its field with matching \`for\` and \`id\` values. Mark required fields with \`required\` and a visible indicator. Use \`aria-describedby\` to reference the description and any inline error. Mark invalid fields with \`aria-invalid="true"\` and explain how to fix the error. Keep browser keyboard support for every native control.

## Content guidelines

Use specific labels and concise help. Tell people which values are expected before submission and explain how to fix each validation error.

## Drupal usage

Retain Drupal Form API attributes, hidden fields, and rendered children. The element, label, and fieldset partials accept Drupal's template variables, including \`attributes\`, \`description\`, and \`errors\`. Drupal's \`#description\` associates the input with its description. For a custom inline error ID, pass it in \`error_attributes\` and append it to the input's \`aria-describedby\`.

## Theming

Controls inherit the active theme's body, background, link, and focus roles. The Forms stylesheet also recognizes Drupal's \`.form-item\`, \`.description\`, and error classes.

## Changes from 1.x

Install the Forms component and build \`forms.scss\` for all five field style groups. The old \`forms.yml\` Storybook data is now maintained in the stories.
`,
  },
};
