# Emulsify UI Kit 1.x → 2.0 migration guide

## Requirements

Use Node.js 24.13.0 or newer.

## Paths and namespaces

Move shared style imports from `src/foundation/` to `src/base/`. Use `@use '../../base' as *;` for the public Sass API and adjust the relative path to match the component's depth. The stylesheet entry is `src/base/base.scss`, which builds to `dist/css/src/base/base.css`.

Change Twig includes from `@foundation/...` to `@base/...`. Update the project structure implementation and CLI system directory to `base` when adapting an existing theme configuration.

### Storybook

Replace JSX decorators in `.stories.js` with Twig render callbacks. For themed previews, pass a `withStorybookContainer()` callback to `renderTwig()`, and map component args inside that callback. See the [Storybook conventions](../AGENTS.md#storybook-conventions).

Move custom Welcome pages and examples from `src/components/docs/` to `src/storybook/`. Use the project's `examples` structure implementation and `@examples` Twig namespace for shared example templates. Example styles now build under `dist/storybook/`.

Update bookmarks, embeds, and other links to renamed Storybook entries.

| Previous entry ID or prefix | New entry ID or prefix |
| --- | --- |
| `docs-cover--cover` | `welcome--docs` |
| `pages-basic--basic` | `examples-basic--basic` |
| `pages-home--home` | `examples-home--home` |
| `tokens-*` | `base-*` |
| `base-colors--colors` | `base-colors--light` or `base-colors--dark` |
| `base-type-faces--type-faces`, `base-type-scale--type-scale`, `base-line-height--line-height` | `base-typography--typography` |
| `base-border-radius--border-radius`, `base-borders--borders` | `base-radius--radius` |
| `base-sizes--sizes` | `base-spacing--spacing` |
| `component-search--*` | `components-search--*` |
| `components-cards--card-vertical`, `components-card--card-vertical` | `components-teaser--card` |
| `components-cards--card-horizontal`, `components-card--card-horizontal` | `components-teaser--inline` |
| `components-call-to-action--call-to-action` | `components-callout--callout` |
| `components-headers-page-title--*` | `components-page-title--*` |
| `components-media-*` | `components-*` |
| `components-button--*` | `deprecated-button--*` |
| `components-typography-links--*` | `deprecated-link--*` |
| `components-typography--headings` | `components-heading--heading` |
| `components-typography--random` | `components-text--inline-elements` |
| `components-typography--blockquote` | `components-blockquote--bar-left` |
| `components-typography--code`, `components-typography--preformatted` | `components-code--code` |
| `components-icons--icons` | `base-icons--library` |
| `components-typography--tables` | `components-table--table` |
| `components-typography-list--*` | `components-list--*` |

## Tokens

Sync `src/tokens/figma.tokens.json` with Tokens Studio and regenerate Sass maps, theme properties, and preview data with `npm run tokens:build`. The former `tokens:transform` and `style-dictionary:build` commands are replaced by this command.

The former `src/tokens/tokens.scss` ships temporarily as `src/base/tokens/legacy-1x.scss`, which builds to `dist/css/src/base/tokens/legacy-1x.css`. Step 15 removes this transitional stylesheet. Use the new API and role properties for component refinements.

### Spacing

The previous spacing values match these steps at a 16 px root font size.

| 1.x property | 2.0 Sass API | 2.0 custom property |
| --- | --- | --- |
| `--spacing-xs` | `space(2)` | `--space-2` |
| `--spacing-sm` | `space(4)` | `--space-4` |
| `--spacing-md` | `space(8)` | `--space-8` |
| `--spacing-lg` | `space(16)` | `--space-16` |
| `--spacing-xl` | `space(32)` | `--space-32` |
| `--spacing-2xl` | `space(64)` | `--space-64` |

The former `--size-*` scale uses the same values and can follow the same mapping.

### Color roles

Use `var(--clr-<role>)` inside a wrapper with `data-component-theme="default light"` or `data-component-theme="default dark"`. Light is the root default. These mappings preserve the resolved light values where the old property served the same role.

| 1.x property or use | 2.0 property | Light value |
| --- | --- | --- |
| `--color-text-body` | `--clr-body` | `#00202e` |
| `--color-text-heading` | `--clr-heading` | `#006089` |
| `--color-white` used as a background | `--clr-background` | `#fff` |
| `--color-grays-200` used as a border | `--clr-border` | `#d4d7d8` |
| `--color-primary-default` | `--clr-primary` | `#009fe4` |
| `--color-grays-600` used as a secondary color | `--clr-secondary` | `#29373d` |
| `--color-link` | `--clr-link` | `#005f89` |
| `--color-link-hover` | `--clr-link-hover` | `#00202e` |
| `--color-primary-darkest` used as a focus indicator | `--clr-focus` | `#00405b` |
| `--status-color-success-bg` used as a success accent | `--clr-success` | `#337b32` |
| `--status-color-info-bg` used as an info accent | `--clr-info` | `#16bdde` |
| `--status-color-warning-bg` used as a warning accent | `--clr-warning` | `#f6c40f` |
| `--status-color-danger-bg` used as an error accent, or `--color-warning-default` used for a field error | `--clr-error` | `#bd1919` |

Choose roles by purpose when replacing palette shades or variant colors. Use `color-mix()` for alpha and check the result in both theme modes.

### Typography and other properties

| 1.x property | 2.0 property or Sass API |
| --- | --- |
| `--font-family-{key}` | `--ff-{key}` or `font-family($key)` |
| `--font-size-{key}` | `--fs-{key}` or `font-size($key)` |
| `--font-weight-{key}` | `--fw-{key}` or `font-weight($key)`. Weights use numeric CSS values. |
| `--line-height-{key}` | `--lh-{key}` or `line-height($key)`. Line heights use unitless ratios. |
| `--letter-spacing-{key}` | `--ls-{key}` or `letter-spacing($key)`. The `tight` value is a CSS length. |
| `--font-primary-*`, `--font-secondary-*` composite properties | `@include typography($style)` with keys such as `primary-h1-bold` and `secondary-body-default`. Set color separately. |
| `--radius-{sm,md,lg}` | `--r-{sm,md,lg}` |
| `--border-{sm,md,lg}` | `--bw-{sm,md,lg}` |
| `--opacity-{0…100}` | `--op-{0…100}`. Use decimal ratios in place of percentages. |

Use `--mo-duration` and `--mo-easing` for the shared motion defaults. The heading mixins use a CSS weight of `700`. The `h1` and `h2` styles use zero tracking, matching the earlier rendered result of their unitless tracking value.

### Component tokens

The Tokens Studio `components/*` and `storybook` sets remain available for design work. The pipeline emits shared tokens from `global`, `semantic`, and the default theme sets. Migrate component-specific global properties such as `--status-color-warning-bg`, `--radius-fieldset`, and `--button-primary-*` to the relevant component's local custom-property hooks. The component migration entries will name each hook as those components are refined.

## Breakpoints

`breakpoint()` emits a container query by default. Existing UI Kit calls now query their nearest ancestor size container. The Base stylesheet provides a root fallback for standalone components. Use `@include breakpoint('md', $media: true)` for external rules that should continue to query the viewport.

| 1.x name | 2.0 name | Previous cutoff | New cutoff |
| --- | --- | ---: | ---: |
| `xsmall-down` | `md-down` | 767 px | 768 px |
| `small` | `md` | 767 px | 768 px |
| `small-down` | `lg-down` | 1040 px | 1024 px |
| `medium` | `lg` | 1040 px | 1024 px |
| `medium-down` | `xl-down` | 1280 px | 1280 px |
| `large` | `xl` | 1280 px | 1280 px |
| `xlarge` | `xxl` | 1640 px | 1440 px |
| `xxlarge` | `xxl` | 1920 px | 1440 px |
| `xsmall` | `sm` or `md` | 610 px | 360 or 768 px |

The cutoffs are rem equivalents at a 16 px base. A `-down` query caps the width 0.05rem below its cutoff. The UI Kit maps both legacy `xsmall` calls to `md` so the textfield label spacing and text-focused image sizing begin at 768 px.

Use the named breakpoint API in place of the old Sass width variables. `_legacy-breakpoints.scss` was removed after the layout primitives moved to generated breakpoints.

## Layout

Embed `@layout/container/container.twig` and `@layout/grid/grid.twig` by path. Include `@layout/placeholder/placeholder.twig` by path as well. The CLI installs all three with the `layout` directory.

### Width and alignment

Rename `container__component_width` to `container__width` and `container__component_alignment` to `container__alignment`. The inner container uses these named widths, subject to the available width of its parent. The width hooks can be set on an ancestor to change its local limits.

| 1.x width | 2.0 width | 2.0 width hook |
| --- | --- | --- |
| `compressed`, `compact`, `narrow` | `narrow` | `--content-width-narrow`, derived from `md` |
| `content`, `standard` | `content` | `--content-width`, derived from `lg` |
| `extended`, `wide`, `max` | `wide` | `--content-width-wide`, derived from `xl` |
| `page`, `full` | `full` | `--content-width-full`, defaults to 100% |

### Spacing

Set `container__spacing` for section padding and `grid__spacing` for the gap. For Page Title, set `page_title__spacing` in place of a spacing modifier. For an embedded Media Box, set `media_box__spacing` to `none` to omit section padding.

| 1.x container class or grid spacing | 2.0 value |
| --- | --- |
| `container--no-spacing` or `no-spacing` | `none` |
| `container--quarter-spacing` or `quarter-spacing` | `quarter` |
| `container--half-spacing`, `grid--half-spacing`, or `half-spacing` | `half` |
| `container--one-spacing`, `one-spacing`, or omitted spacing | `one` |
| `container--two-spacing` or `two-spacing` | `two` |
| `container--three-spacing` or `three-spacing` | `three` |
| `container--four-spacing` or `four-spacing` | `four` |
| `container--no-top` or `container--no-bottom` | `none-top` or `none-bottom` |
| `container--spacing-top` or `container--spacing-bottom` | `one-top` or `one-bottom` |
| `container--half-bottom` | `half-bottom` |
| `container--two-spacing-top` or `container--two-spacing-bottom` | `two-top` or `two-bottom` |
| `container--three-spacing-bottom` | `three-bottom` |

The container's `-top` and `-bottom` variants set the named edge and keep one unit on the opposite edge. `three-bottom` applies three units to the bottom. Section padding and margin-gap mixins use `space(32)` as one unit at `md` and above and 80% of that below `md`. `margin-gap-bottom()` now applies to the last child as well. Scope `--grid-spacing` to override a grid's gap.

### Classes and composition

| 1.x class or markup hook | 2.0 class, prop, or block |
| --- | --- |
| `.container--*-spacing` | `[data-component-spacing]` on the container, set with `container__spacing` |
| `.container--with-bg` | `container__bg_color: true` to paint the theme background |
| `data-component-theme="inverse"` or `"standard"` | `container__theme: 'default'` with `container__theme__variation: 'dark'` or `'light'` |
| `container__inner_additional_classes` | `container__inner__additional_classes` |
| `container__prefix__intro` | Use `container__prefix` above the wrapper or `container__content` inside it |
| `container__show_link` | Supply the link label and URL or fill `container__intro__link` |
| `.container--layout-split`, `.container--embedded`, `.container--bordered`, or `.container--view-content` | Express the layout with width, alignment, spacing, or `container__style: 'contained'`. Add project-specific styling where needed. |
| `data-grid-count-class` or `grid__item__count` | Pass `grid__columns` as a ceiling from 1 to 6. Grid handles the active item count. |
| `grid__item__alignment` | `grid__alignment` for the final row and `grid__last_item_alignment` for a separate last row |
| `grid__separators` or `data-grid-separators` | Use item-level borders or project-specific styling. |
| `.place-holder` and `.place-holder__content` | `.placeholder` and `.placeholder__content` |
| `place_holder` and `place_holder__modifiers` | `placeholder__text` and `placeholder__modifiers` |

Keep grid items as direct children of `grid__content`. The heading, prefix, and suffix blocks render outside the tracks. Pass `grid__inner__attributes` for the inner element and `grid__attributes` for the outer element. The Grid Docs tab covers final-row alignment and the focus-column fallback.

Update Placeholder story links from `layout-place-holder--place-holder` to `layout-placeholder--placeholder`. Use the Base/Placement guide for `grid-tracks()` and `grid-column()` examples.

`withStorybookContainer()` now paints the active theme background. Pass `{ bgColor: false }` as its options to keep the story canvas background.

## Components

### Button and Link → CTA

Use `@components/cta/cta.twig` for calls to action. Use a plain anchor for in-text links and let the Base stylesheet supply the themed underline, hover, and focus styles. Button and Link remain available during the component waves. Their Storybook examples are under Deprecated.

| Button or Link input | CTA input |
| --- | --- |
| `button__content`, `link__content` | `cta__text` for a text label. Override the `cta__content` block for a custom label. |
| `button__href`, `button__attributes.href`, `link__url` | `cta__url`. Pass a Drupal link render array as `cta__link`. |
| `button__element` | `cta__element` accepts `a`, `button`, or `span`. CTA defaults to `a`, so specify `button` for in-page actions. |
| `button__type` | `cta__button_type` sets the native `type` attribute in place of `button-action`. Use `button`, `submit`, or `reset`. The default `button` does not submit the enclosing form. |
| `button__style`, `button__modifiers`, `link__modifiers`, `link__style` | `cta__modifiers` accepts `primary`, `secondary`, `link`, and `clean` as appearance choices. Use `primary` for a filled button and `link` for a text-style CTA. |
| `button__icon.name`, `button__icon.left`, `button__icon.right` | Pass the icon name to `cta__icon` and use `cta__icon_position: 'left'` or `'right'`. |
| `button__external`, `link__external` | `cta__new_tab`. CTA adds the target, safe `rel` values, and an accessible new-tab notice. |
| `button__blockname`, `link__blockname` | `cta__blockname` |
| `button__additional_classes`, `link__additional_classes` | `cta__additional_classes`. Use it for any old base class needed by local code. |
| `button__attributes`, `link__attributes`, standalone ARIA values | `cta__attributes`. Use `aria-label` to label an icon-only CTA. Use `disabled` for a disabled button. |

Keep old style-only values such as `filled` out of `cta__button_type`. Set a CTA appearance modifier instead. Use `cta__attributes` for native and ARIA state and the `cta__content` slot for custom label markup. CTA uses the inherited light or dark color roles. Remove inverse or dark appearance modifiers when migrating.

Pass relative URLs or HTTP, HTTPS, email, and telephone URLs in `cta__url`. Use `cta__link` to preserve routed URLs and Drupal link options. Include the new-tab notice in any accessible name you supply through `aria-label` or `aria-labelledby`.

### Heading, Text, Blockquote, and Code

| 1.x template or prop | 2.0 replacement |
| --- | --- |
| `@components/typography/heading/heading.twig` | `@components/heading/heading.twig` |
| `heading`, `heading_url`, `heading_link_*` | `heading__content`, `heading__url`, and `heading__link_*` |
| `@components/typography/text/text.twig` and `paragraph.twig` | `@components/text/_text.twig`. Pass `text__element: 'div'` for block markup or `p` for a paragraph. Map `paragraph_*` to the corresponding `text__*` props. |
| `@components/text/text.twig` block `text_content` | `text__formatted_content`. Use processed Drupal markup or a render array in `text__content` for a whole formatted value. |
| `text_field__heading`, `text_field__container_modifiers` | `text__heading`, `text__container__modifiers` |
| `@components/typography/text/blockquote.twig` | `@components/blockquote/blockquote.twig` |
| `blockquote__content` | `blockquote__quote` for the prop and `blockquote__quote_content` for the slot. Use `blockquote__attribution_content` for custom attribution markup. |
| `blockquote__aria_label` | Pass `aria-label` through `blockquote__attributes` when the quotation needs one. |
| `@components/typography/text/code.twig` | `@components/code/code.twig` |
| `code_content` | `code__content` for literal source and `code__snippet_content` for author-controlled markup. Pass raw source text so the escaping preserves HTML tags and indentation. |

Use `heading__level` for the document outline and a modifier such as `h3` or `display` for visual size. Linked headings use the Base anchor treatment. The `typography` component directory and CLI group have been removed.

### Icon and List

- Include `@components/icon/icon.twig` in place of the former `@components/icons/_icon.twig`. Icon inlines the SVG file from `assets/icons/`. Register `assets: assets` under `components.namespaces` in your theme's `.info.yml` if the namespace is missing.
- For meaningful icons, set `icon__decorative: false` and supply a title. Set a distinct `icon__id` per rendered instance to derive stable title and description IDs. For decorative icons, use `icon__decorative: true`.
- Change `@components/lists/list.twig` and `@components/lists/_list-item.twig` to `@components/list/list.twig` and `@components/list/_list-item.twig`. Rename `list__addition_classes` to `list__additional_classes`. `list__content` and `list__item__content` remain available for embeds.
- Pass list entries as `{ content, children? }` objects. A nested list goes in `children` with its own `type`, `items`, and optional `modifiers`. Standalone lists show native markers by default. Scoped navigation lists retain their marker-free treatment.

### Image and Video

| 1.x input | 2.0 replacement |
| --- | --- |
| `responsive-image.twig`, `_responsive-image.twig`, `_image.twig`, `_picture.twig`, `_figure.twig` | Include `@components/image/image.twig`. Import Storybook examples from `image.component.yml`. |
| `output_image_tag`, `card__image__output_image_tag` | Pass `image__sources` for picture candidates. The Image template picks the appropriate element. |
| `responsive_image_blockname` | `image__blockname` |
| `image__show_caption`, `image__show_copyright`, `image__copyright` | Pass `image__caption` or `image__credit` to render a figure. Omit each value to hide it. |
| `video__urls` | `video__sources`, an array of `{ src, type? }` objects. |
| `video_content` HTML or slot | `video__embed_url` with a `video__title`. Use Embed for an existing trusted iframe fragment. |
| `video__show_placeholder`, `playback-button.twig` | `video__poster` for the play-button preview. Opt into `video__autoplay` and `video__loop` for muted background playback. |
| `video_object__attributes` for autoplay and loop | Use the dedicated video props. Use `video__attributes` for the outer element. |
| `video__show_caption`, `video__show_copyright`, `video__copyright` | Pass `video__caption` and `video__credit` for visible attribution. Pass `video__tracks` for timed captions, subtitles, or descriptions. |
| `video-html5.yml`, `video-embed.yml`, `playback.js`, `video-embed.js` | Use `video.component.yml` and `video.js`. |

Supply `image__alt` for every image. An empty value requires `image__decorative: true`. Use `image__srcset` and `image__sizes` for responsive candidates. Give videos a descriptive title and supply caption tracks for meaningful audio.

### Card → Teaser

Replace the `card` SDC or `@components/card/card.twig` include with `teaser` or `@components/teaser/teaser.twig`. Set `teaser__style: 'card'`.

| Card input | Teaser input |
| --- | --- |
| `card__heading`, `card__subheading` | `teaser__heading`, `teaser__subheading`. Set `teaser__heading_level` to match the page outline. |
| `card__body` | `teaser__content` for plain text, or the `teaser__summary_content` slot for formatted copy. |
| `card__heading__link`, `card__link__url` | `teaser__url`. Use the heading destination when both were set. |
| `card__link__text` | `teaser__ctas: [{ content: 'Read more' }]` for a visible cue to the heading link. |
| `card__image__src`, `card__image__alt`, responsive candidates | Use the matching `teaser__image__*` props. For decorative media, use `teaser__image__decorative: true` and an empty alt. |
| `card__img` block | `teaser__media_content` slot. |
| `horizontal` modifier | `teaser__layout: 'inline'`, with `teaser__media__alignment` to place the media. |
| `card__blockname`, `card__modifiers`, `card__extra_classes` | `teaser__blockname`, `teaser__modifiers`, `teaser__additional_classes`. |

The heading carries the destination. Move secondary destinations, including links from the old Card subheading, outside the teaser. Omit the media source or set `teaser__show_media: false` to hide the media. Replace custom Card element classes with Teaser selectors and its local theme properties.

### Media Box

- Rename the `media_box__media` slot to `media_box__media_content`. Use `media_box__image__src` and `media_box__image__alt` for images, or `media_box__video__sources` or `media_box__video__embed_url` with `media_box__video__title` for video. Supply real sources in place of the old demo placeholders. For built-in media, prefer `media_box__image__caption` and `media_box__image__credit` or the corresponding `__video__*` fields. Include attribution in custom slot markup when overriding the media.

### Text with Image

- Rename the `text_with_image__image` slot to `text_with_image__media_content`, or use the `text_with_image__image__*` props. Move image caption and copyright to `text_with_image__image__caption` and `text_with_image__image__credit`. Omit these values to hide them.
- Replace `text_with_image__position` with `text_with_image__media_alignment: 'left'` or `'right'`. The `data-media-alignment` attribute controls desktop placement and the copy comes first in source and stacked order. Choose a standard container width. Use `text_with_image__focus` to set the relative column widths.
- Replace `text_with_image__link__content` and `text_with_image__link__url` with an item in `text_with_image__ctas`, using the keys `content` and `url`.

### Call to Action → Callout

| Call to Action input | Callout input |
| --- | --- |
| `call-to-action` SDC, `@components/call-to-action/call-to-action.twig` | `callout` SDC, `@components/callout/callout.twig` |
| `call_to_action__heading`, `call_to_action__overline`, `call_to_action__text` | Match the suffix under the `callout__` prefix. Set `callout__heading_level` to match the page outline. |
| `call_to_action__button__text`, `call_to_action__button__url` | `callout__ctas[0].content` and `callout__ctas[0].url` |
| `call_to_action__theme: 'white-bg'` or `'light-blue-bg'` | Use `callout__theme: 'default'` and `callout__theme__variation`, with `--callout-background` scoped to the panel for a custom fill. |
| `call_to_action__blockname`, `call_to_action__modifiers` | `callout__blockname`, `callout__modifiers` |

Callout forwards the shared container props and supports two CTAs. Its styles use the `.callout` BEM block. In Tokens Studio, sync the renamed `components/callout` token set (formerly `components/cta`).

### Banner

| 1.x input | 2.0 replacement |
| --- | --- |
| `banner__link_items` | `banner__ctas` with up to two items containing `content` and `url`, plus optional `icon` and `icon_position`. |
| `banner__heading__level` | `banner__heading_level` as an integer from 2 to 6. Set it to 4 to keep the old default level. |
| `banner__image` | `banner__image__src` with meaningful `banner__image__alt`, or `banner__image__decorative: true` for decorative images. |
| `banner__video` | `banner__video__sources` with `{ src, type? }` objects. Supply `banner__video__title` and caption tracks for meaningful audio. |
| `banner__media` and `banner__media_caption` blocks | `banner__media_content` and `banner__media_caption_content` slots. An explicit media slot takes priority, followed by video sources and then an image source. |
| `banner__container_modifiers` | `banner__container__modifiers` |
| Default narrow width and dark theme | Set `banner__width: 'narrow'` and `banner__theme__variation: 'dark'` to preserve those defaults. The new default is wide and inherits the theme. |

Media stacks below the copy on narrow sections and sits beside it at wider widths. Video starts paused with native controls. Pass a unique `banner__id` for a stable `#section-{id}` anchor and, when a heading is present, its accessible section label.

### Announcement

- Replace `announcement__title` with `announcement__heading` and `announcement__heading__level` with the integer `announcement__heading_level`.
- Replace `announcement__button_text` and `announcement__button_url` with the `content` and `url` fields in `announcement__ctas`. Replace `additional_attributes` with `announcement__attributes`.
- Set `announcement__icon` to an icon name, and supply plain text in `announcement__content`. Replace the `light` or `dark` variant with `announcement__variant: 'tint'` inside the corresponding theme wrapper.

### Stats Group

- Use `stats_group__width` in place of `stats_group__container_width`. Set `stats_group__animate` to opt into motion. The old Twig input `stats_group__motion` is replaced.
- Pass `stats_group__heading_level` and `stats_group__grid_columns` as integers. Each item's `description` is a plain-text label. Statistics now render as description-list terms and values. Use `stats_group__heading_level` for the section heading.
- Switch the `stats_group__items__block` override to the `stats_group__items_content` slot. Supply complete statistic items in that slot in place of the old `_stats-group-item.twig` partial, and update CSS selectors to `.stats-group__description` and `.stats-group__metric`.

### Tags

- Rename `items` to `tags__items`, the `tags__items` block to `tags__items_content`, and `tags__addition_classes` to `tags__additional_classes`. Use `tags__blockname` or `tags__additional_classes` for custom classes formerly supplied via `tags__base_class`.
- Items keep `title`, `url`, and `color`. The color tints the background while text uses the active theme foreground. Use `.tags__link` for styling linked and static labels.

### Status

- Pass Drupal's `message_list` as `status__messages` and any translated `status_headings` as `status__labels`. Use an array of messages for each type. The `status` key maps to success and `danger` maps to error.
- Pass wrapper attributes as `status__attributes`. The `presentational` prop is removed. Update variant selectors from `.status--{type}` to `[data-status-type='{type}']`.
- To offer a dismiss button per group, set `status__dismissible: true` and attach the component behavior with Drupal once.

### Table

- Replace the `tables` SDC and `@components/tables/tables.twig` with `table` and `@components/table/table.twig`.
- Prefix `caption`, `header`, `rows`, `footer`, `empty`, `header_columns`, and `colgroups` with `table__`. Pass HTML attributes as `table__attributes` and use `table__blockname` or `table__additional_classes` in place of `table__base_class`.
- Use `tag: 'th'` for row headings. The template sets column scope in the header and row scope for other heading cells. Set `scope` explicitly for grouped headers. Use `.table__cell` for cell styling.
- Attach the Table behavior with Drupal once to enable named keyboard scrolling when the table overflows. Its label defaults to the caption. Set `table__scroll_label` for a distinct name when the table has no caption.

### Embed

- Replace the `embed_content` prop with `embed__iframe` for trusted markup. Rename the `embed_content` slot to `embed__content`. Every iframe needs a descriptive, nonempty `title`; markup containing untitled iframes is omitted.
- Use `embed__src` and `embed__title` to generate an iframe from a URL. Use `embed__container__modifiers` for Container modifiers and the shared `embed__blockname` or `embed__additional_classes` in place of `embed__base_class`.
- Pass `embed__heading_level` as an integer from 2 to 6. Custom aspect ratios take a positive number or two positive numbers separated by a slash, such as `21 / 9`.

### Audio Player

- Rename `audio_content` to `audio_player__sources`. Pass media URLs or `{ src, type? }` objects in playback preference order.
- Replace `preload`, `loop`, `muted`, and `no_download` with their `audio_player__` equivalents. Pass `additional_attributes` as `audio_player__attributes`. Remove `autoplay`; playback starts with the listener.
- Add `audio_player__transcript_url` and an optional `audio_player__transcript_label` to point to the transcript.

### Logo

- Pass `logo__src` and `logo__alt` in place of `image_src` and `image_alt`. Both are required, including in Header branding overrides. Use the shared block name or class props in place of `logo__base_class`.
- Supply `logo__url: '/'` to keep the former default home link. Omit the URL for a static logo. Logo renders its image directly through Image, and the image alt names the link when present.

### Link Group

- Rename the `link_group__items` slot to `link_group__items_content` and pass complete list items. The `link_group__items` prop remains available and becomes optional.
- Both display variants use CTA anchors. Migrate custom button and link styling to CTA classes. The button variant with a background now uses the shared contained style.
- Set `link_group__nav_label` when the group should be a named navigation landmark.

### Accordion

- Supply a unique `accordion__id` and an `id` for each entry. Replace the item keys `accordion__item__heading` and `accordion__item__content` with `heading` and `content`. Existing generated IDs change to `accordion-{accordion__id}--{item.id}`; use these IDs for item fragments.
- Rename the `accordion__items` slot to `accordion__items_content`. For a custom item partial, pass both IDs and use its `accordion__item__body_content` slot. Replace `accordion__block_name` with `accordion__blockname` and use `.accordion__heading` and `.accordion__panel` for styling.
- Set `accordion__show_controls: true` to offer expand-all and collapse-all controls. Items start expanded in server output and collapse when the Drupal behavior attaches, except for the item referenced by the URL fragment.

### Tabs

- Replace the `tabs` prop with `tabs__items` and map each `tab__label`, `tab__content`, and `tab__icon` item key to `label`, `content`, and `icon`. Add a unique `id` to each item and a page-unique `tabs__id` to the component.
- Replace the `tab__content` slot with `tabs__panels_content`. Custom panels need an ID of `tabs-{tabs__id}:panel:{id}` and `aria-labelledby="tabs-{tabs__id}:tab:{id}"` to match their controls. Update existing tab fragments to the new panel IDs.
- Replace `container__component_width` and `tab__component_theme` inputs with `tabs__width` and the shared Tabs theme props. Use the corrected `horizontal-plain` display name. Tabs wrap at narrow widths in place of the old overflow scroll controls. Use `.tabs__tab` and `.tabs__panel` for component styling.

### Offcanvas

- Keep `offcanvas__content` and `offcanvas__suffix` as props. Rename the old `offcanvas__content` and `offcanvas__suffix` slot overrides to `offcanvas__body_content` and `offcanvas__footer_content`. Rename the `offcanvas__trigger` slot to `offcanvas__trigger_content`.
- Use `offcanvas__heading_level` in place of `offcanvas__heading__level`. Pass a distinct ID for each dialog. Use `offcanvas__theme__variation` to select light or dark.
- Attach the Offcanvas Drupal behavior with Drupal once. The pane is non-modal and the modal type uses the browser's modal dialog. The trigger and close action use CTA styles.

### Navigation Base

- The Emulsify CLI lists `navigation/base`, `navigation/breadcrumbs`, `navigation/main`, `navigation/pager`, and `navigation/social` as separate entries. The default install includes all five.
- For the Base Menu SDC, pass `base__items` and a page-unique `base__id`. Set `base__label` to name the landmark. Use `base__toggle` for the outer disclosure, `base__disclosures` for submenus, and `base__items_content` to supply complete list items. The shared `menu.twig` partial accepts `menu__items` or the legacy `items` variable, and `menu__id` for the stable menu ID.
- Supply stable menu item keys or `id` values when possible. The menu derives disclosure IDs from the menu ID and item path. Use `menu_toggle__label` and `menu_toggle__controls` for direct uses of the toggle partial. Update scripts and styles that rely on the old wrapper expansion classes to use the button's `aria-expanded` and the panel's `hidden` state.

### Main Navigation

- Pass `main__items` to `@components/navigation/main/main.twig`. The legacy `items` alias also works. Supply a different `main__id` for each instance on a page, and set `main__label` when the page has multiple navigation landmarks. The shared menu toggle behavior is part of `navigation/base`.
- Submenus open from separate disclosure buttons. Parent links keep their destinations, and the old repeated parent item is removed from the submenu. Escape closes the open submenu and returns focus to its button.
- Main switches layouts when its links exceed the available width. Keep the menu in a shrinkable wrapper in a flex header. Use `data-menu-mode` to style the `inline` and `compact` states in place of fixed-breakpoint menu styles.

### Breadcrumbs

- Pass items as `breadcrumbs__items`. The Twig include also accepts `breadcrumbs_items` and Drupal's `breadcrumb` variable. Set `breadcrumbs__label` to customize the navigation landmark name.
- The breadcrumb trail wraps and the last item is current-page text. Remove the old scroll behavior and custom styles tied to its scroll controls. Wrap the trail in Container at the call site when it needs a section width or theme.

### Pager

- Pass Drupal pager data as `pager__items`, `pager__current`, and `pager__ellipses`. The Twig include still accepts `items`, `current`, and `ellipses`. Set `pager__label` to distinguish multiple pagination landmarks on a page.
- The current page renders as text with `aria-current="page"`. The directional controls have visually hidden names, which can be customized via the item's `label`. Import the Storybook examples from `pager.component.yml` in place of the four `pager-*.yml` files.

### Social Navigation

- Pass `social__items` with a title and URL per link. The Twig include still accepts `items`. Pass modifiers with `social__modifiers`. Override `social__items_content` with complete list items in place of extending `_social-list.twig` or overriding `menu_list__content`.
- Icons are decorative. The item title names the link and remains visible when no icon is available. Set `social__label` to distinguish separate landmarks and scope the surrounding theme for contrast.

### Search

- Use `search__label` for the input label and `search__toggle_label` for the optional disclosure. The form is visible by default. Set `search__show_toggle: true` and a page-unique `search__id` to enable the disclosure, and use `search__show_label: false` for a visually hidden input label.
- Set `search__action` and `search__input_name` to the route and query parameter used by your site. Pass a rendered Drupal form to `search__form_content` in place of overriding the old `header__search` block inside Search. The `search_form` Twig variable remains a fallback. Search keeps the form within its landmark at all widths.

### Forms

- `forms.component.yml` defines the Forms SDC. The former `forms.yml` demo data now lives in the stories. Pass fields and actions through the `forms__fields_content` slot when using the native wrapper. Keep the wrapper supplied by Drupal for Form API forms.
- Compile `forms.scss` to include the five field style groups. Form API and the field partials use native labels, descriptions, required states, and errors. Keep each field's existing `aria-describedby` IDs and append the error ID when adding an inline error. Style theme variations through the inherited color roles.

### Hero

- Use `@components/hero/hero.twig` for a page introduction. Set `hero__heading_level: 1` when Hero owns the page title. Use levels 2–6 within a page that already has a title. Pass up to two `{ content, url, icon?, icon_position? }` items as `hero__ctas`.
- Choose `hero__media_type: 'image'`, `'video'`, or `'none'`. Supply a text alternative for a meaningful image, or leave its alt text empty for decoration. Use `hero__media_content` for composed markup and the shared section props for width, spacing, and theme.
- Use `hero__video__background: true` for decorative, muted looping video. Include the Video behavior to enable motion-aware playback and a visible pause button. Use a regular video with captions and a title for meaningful media.

## Removed
