export default {
  description: {
    component: `
## Overview

Page Title introduces a page with its primary heading and optional supporting content.

## Anatomy & composition

The optional breadcrumb trail appears above the heading. Add an overline before the heading and a subheading, formatted description, or up to two CTA links after it. A media slot accepts a composed image or video.

## Variants

Inline media sits beside the copy when the component has enough space. Set the media alignment to left or right. Stacked media always sits below the copy. Both layouts keep the copy before the media in the document order.

## Accessibility

Page Title renders one h1. Use it once inside the main landmark and place the rest of the page under h2 headings. Keep breadcrumbs in a labelled navigation landmark and give meaningful media a text alternative.

## Content guidelines

Name the page directly. Use the subheading for short supporting text and the description slot for formatted content. Keep actions focused on the main tasks and use distinct link labels.

## Drupal usage

Pass the page heading as \`page_title__heading\`. Place the Drupal breadcrumbs render array or Breadcrumbs component in \`page_title__breadcrumbs_content\`. Pass rendered copy and media using \`page_title__description_content\` and \`page_title__media_content\`. Pass up to two actions as \`page_title__ctas\` with content, url, and optional icon and icon_position fields.

## Theming

Page Title uses the active theme's body and heading roles. Set the shared Container props for section width, spacing, theme variation, and background.

## Changes from 1.x

Replace the separate link labels, URLs, and icon fields with the CTA array. Move the description and media blocks into their corresponding content slots. Compose Image or Video in the media slot with its own caption or credit props, and set the layout and alignment on Page Title.
`,
  },
};
