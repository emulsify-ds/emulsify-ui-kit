# Emulsify UI Kit 2.0 roadmap

Coordinate the 16 refinement steps for the single Emulsify UI Kit 2.0.0 release.

## Decisions

- Node 24 LTS: .nvmrc 24, engines.node >=24.13.0.
- src/foundation becomes src/base, and the Twig namespace becomes @base.
- No clr() Sass function in 2.0. Components use color custom properties directly: var(--clr-{role}) and var(--clr-{role}-{variant}). Alpha uses color-mix().
- Themes are custom properties emitted by the token build. Markup sets data-component-theme="<theme> <light|dark>". The dark variation redefines the same role properties, so components never write their own dark overrides. 2.0 ships the default theme in light and dark.
- Spacing: space($px), keyed by pixel value. Scale: 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 120. Off-scale values are a build error.
- Breakpoints: sm 360, md 768, lg 1024, xl 1280, xxl 1440, plus md-down, lg-down, xl-down. breakpoint() emits container queries by default; $media: true emits a media query instead.
- 1.x token custom properties are removed with no aliases. Figma component token sets stop generating global custom properties; components expose local custom-property hooks instead.
- button and link merge into one cta component. Plain links are styled globally in base.
- call-to-action is renamed callout. card folds into the new teaser (teaser__style: card).
- New components: hero and teaser. No slider. Components never import npm packages at runtime.
- Component names are singular when the component is one thing (icon, list, table). Groups keep plural names (tags, forms, stats-group, link-group).
- Layout primitives (container, grid, placeholder) stay in src/layout and are included by path, not as SDCs.
- Storybook-only helpers live in src/util and are never bundled into Drupal assets.
- Fix all 8 prop/slot name collisions, import the five forms partials, and fix the "[object Object]" token output.
- Single 2.0.0 release: this branch merges into release-2.x, and release-2.x is later squash-merged into main.

## Steps

- [x] 1 Tooling and hygiene
- [x] 2 Rules and checks
- [x] 3 Storybook infrastructure
- [x] 4 Base layer
- [x] 5 Tokens
- [x] 6 Layout primitives
- [x] 7 CTA
- [ ] 8 Wave A: heading, text, blockquote, code, icon, image, list, video
- [ ] 9 Wave B1: teaser, card, media-box, text-with-image, callout
- [ ] 10 Wave B2: banner, announcement, stats-group, tags, status
- [ ] 11 Wave B3: table, embed, audio-player, logo, link-group
- [ ] 12 Wave C1: accordion, tabs, offcanvas
- [ ] 13 Wave C2: navigation, search, forms
- [ ] 14 Wave D: hero, header, page-title
- [ ] 15 Cleanup
- [ ] 16 Docs, accessibility gate, ready for review

## Notes for later steps

### Step 2 contract baseline

`npm run test:contract` reported 547 violations across 30 component directories. The allowlist starts empty. Add a directory to it after bringing that component up to the contract.

| Component directory | Violations |
| --- | ---: |
| `accordion` | 19 |
| `announcement` | 19 |
| `audio-player` | 7 |
| `banner` | 23 |
| `blockquote` | 10 |
| `button` | 12 |
| `call-to-action` | 16 |
| `card` | 23 |
| `embed` | 30 |
| `header` | 10 |
| `link` | 16 |
| `link-group` | 23 |
| `lists` | 11 |
| `media-box` | 19 |
| `navigation/breadcrumbs` | 10 |
| `navigation/main` | 14 |
| `navigation/pager` | 17 |
| `navigation/social` | 9 |
| `offcanvas` | 27 |
| `page-title` | 74 |
| `search` | 12 |
| `stats-group` | 33 |
| `status` | 16 |
| `tables` | 14 |
| `tabs` | 13 |
| `tags` | 9 |
| `text` | 9 |
| `text-with-image` | 20 |
| `typography/heading` | 11 |
| `typography/text` | 21 |

The report also found 30 global violations. The `blockquote.component.yml` basename appears twice. The manifest lists seven entries without component metadata, omits 16 component directories, and has six dependency references to absent entries (`container` and `list`). Step 15 enables `enforceGlobal` and makes hex colors a Stylelint error.

### Step 3 Storybook infrastructure

- Enable `autodocs` on refreshed stories and load prose from the sibling `.docs.js`. Examples/Basic demonstrates the Docs entry.
- Use `argsFromSchema()` for schema defaults and `withStorybookContainer()` for new appearance controls. Map args inside the render callback. Existing previews use `withStorybookPadding()` until their layouts are refined.
- The Storybook preview exposes `once()` for Drupal behaviors. Base token copy controls use native buttons with `data-usage` and the delegated clipboard helper.
- Welcome and examples live under `src/storybook/`. Their styles use the Storybook output bucket. Story IDs that changed are listed in the [migration guide](../migration-2.0.md#storybook).

### Step 4 Base layer

- Import the public Sass API from `src/base/`. Use `base.scss` for the global stylesheet and `@base` for Twig paths.
- Existing breakpoint calls use container queries. The Base stylesheet supplies the root fallback for standalone components. Use a closer size container when the component should respond to the width of its layout.
- Step 5 generates the breakpoint map and supplies `--clr-focus`. Step 6 migrates the raw layout widths and removes `_legacy-breakpoints.scss`.
- `npm run test:sass` exercises the public API. The build comparison for this step covers two renamed CSS paths, 15 new root spacing properties, the root query container, and the breakpoint changes.

### Step 5 Tokens

- Edit `src/tokens/figma.tokens.json` and run `npm run tokens:build`. The generated Sass maps, theme properties, and preview JSON live in `src/base/tokens/`. The Base previews use that JSON and native token copy buttons.
- Use `var(--clr-<role>)` with `data-component-theme="default light"` or `data-component-theme="default dark"`. Focus contrast against the theme background is 11.14:1 in light and 7.55:1 in dark. Check component-level foreground and background pairs as each component migrates.
- Use `typography($style)` for composite type declarations, the scalar type functions for individual properties, and `fluid-type($min-px, $max-px)` when a size should scale between the `sm` and `xl` viewport widths.
- Keep `legacy-1x.scss` frozen while components migrate. Step 15 removes that stylesheet. Preserve its property names as a contract test fixture before removing it so the check continues to reject 1.x tokens.
- Component and Storybook token sets remain in Tokens Studio. The build emits shared tokens exclusively. Use the [migration table](../migration-2.0.md#tokens) and local hooks when replacing old component properties.

### Step 6 Layout primitives

- Embed the container by path for sections. Forward the shared section props, use the four width values and `container__spacing`, and fill the `container__content` block. Omit the theme props to inherit the surrounding theme.
- The outer and inner container and grid wrappers establish size containers. Grid uses 1 track below `md`, up to 2 at `md`, up to 4 at `lg`, and the configured ceiling at `xl`. Keep items as direct grid children. Use Base/Placement when positioning parts of a component on a shared 12-track grid.
- Set `--content-width-narrow`, `--content-width`, `--content-width-wide`, or `--content-width-full` on an ancestor for local width limits. Scope `--grid-spacing` for a custom grid gap.
- Container, Grid, and Placeholder follow the enforced contract with `<name>.yml` schemas. Follow their Layout Docs tabs for examples. The CLI installs them through the layout directory.
- The [layout migration tables](../migration-2.0.md#layout) cover old widths, spacing modifiers, classes, and template props.

### Step 7 CTA and plain links

- Include `@components/cta/cta.twig` for calls to action. Set `cta__element: 'button'` for actions and opt into `submit` or `reset` using `cta__button_type`. Use `cta__text` for labels and `cta__content` for custom label markup. Use a plain anchor for text links. The [CTA migration table](../migration-2.0.md#button-and-link--cta) maps the legacy props.
- CTA uses inherited light and dark roles. Choose one appearance modifier from `primary`, `secondary`, `link`, or `clean`. The legacy icon partial remains in use until the icon wave. Button and Link remain available under Deprecated during the migration waves. Step 15 removes them.
- The Base anchor rule has zero specificity. Local selectors still win. Recheck `.text a` in Wave A, the card heading and CTA link styles in Wave B1, `.main-nav__link`, `.main-nav__placeholder`, `.breadcrumbs__link`, and `.social-nav__link` in Wave C2, and `.page-title__overline-link` in Wave D as their legacy `link` mixins are removed.
- Tags, Pager, Tabs, and Link Group have their own decoration rules. Verify inline links and navigation affordances when revising those selectors. Use the Base `link-underline` mixin when a local style needs the shared underline behavior.
