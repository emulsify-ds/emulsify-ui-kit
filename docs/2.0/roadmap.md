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
- [ ] 2 Rules and checks
- [ ] 3 Storybook infrastructure
- [ ] 4 Base layer
- [ ] 5 Tokens
- [ ] 6 Layout primitives
- [ ] 7 CTA
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
