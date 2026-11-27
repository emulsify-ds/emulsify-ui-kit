export default {
  description: {
    component: `
## Overview

Search helps readers query the site from a named search landmark.

## Anatomy & composition

The form includes a search input with a native label and a CTA submit button. An optional disclosure button controls the form's visibility.

## Variants

The form is visible by default. Set \`search__show_toggle\` with a unique \`search__id\` for a compact disclosure. Set \`search__show_label: false\` to visually hide the input label.

## Accessibility

A native label names the input, including when the label is visually hidden. The disclosure moves focus to the input on open. Escape closes the form and restores focus to the disclosure button. The form remains usable without JavaScript.

## Content guidelines

Use a label that describes the scope of the search. Give search landmarks distinct names when several searches share a page.

## Drupal usage

Set \`search__action\` and \`search__input_name\` to match the search route. Pass a Drupal search block in \`search__form_content\` to replace the built-in GET form. The supplied form should have its own accessible input label and a submit control.

## Theming

Search inherits the active theme and uses its body, background, and focus roles.

## Changes from 1.x

Use \`search__label\` for the field and \`search__toggle_label\` for a disclosure button. Move Drupal form content to \`search__form_content\`. The component keeps the form within the search landmark across layouts.
`,
  },
};
