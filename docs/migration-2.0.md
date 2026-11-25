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
| `components-cards--*` | `components-card--*` |
| `components-headers-page-title--*` | `components-page-title--*` |
| `components-media-*` | `components-*` |

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

The old Sass width variables live in `src/base/breakpoints/_legacy-breakpoints.scss` during the layout migration. Replace their use in new code with the named breakpoint API.

## Layout

## Components

## Removed
