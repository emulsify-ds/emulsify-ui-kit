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
| `component-search--*` | `components-search--*` |
| `components-cards--*` | `components-card--*` |
| `components-headers-page-title--*` | `components-page-title--*` |
| `components-media-*` | `components-*` |

## Tokens

## Breakpoints

`breakpoint()` emits a container query by default. Use `@include breakpoint('md', $media: true)` for a viewport query. Existing viewport call sites in the UI Kit now pass `$media: true` explicitly.

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
