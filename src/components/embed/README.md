---
title: Embed
---

### What this component does

Embed wraps consumer-provided iframe/embed markup (YouTube, Vimeo, maps,
forms, or another approved third-party widget) in a responsive,
aspect-ratio-controlled box, with an optional heading, introductory text,
and caption. Container width, alignment, theme, and background come from
the shared `@layout/container/container.twig` component that Embed is
built on top of - the same component `banner` and `media-box` use.

**Usage:**

```twig
{% include "@components/embed/embed.twig" with {
  embed__heading: 'Watch the highlight reel',
  embed__text: '<p>Recorded at our 2026 summit.</p>',
  embed__ratio: '16-9',
  embed_content: '<iframe title="Highlight reel" src="https://www.youtube-nocookie.com/embed/VIDEO_ID" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  embed__caption: 'Recorded live at the 2026 Emulsify Summit.',
} %}
```

See `embed.component.yml` for the full prop list, and the "Embed" story
in Storybook for a controls-driven playground - use the Controls panel
to switch between embed sources (video/map/mock widget), aspect ratios
(16:9, 4:3, 1:1, custom), container width/alignment/theme/background,
and to confirm no heading/intro wrapper renders when heading and text
are cleared.

### Trust boundary - read before use

**This component does not sanitize embed markup.** `embed_content` is
rendered with Twig's `raw` filter, the same way the existing Video
component renders `video_content`. Passing this prop does not make
arbitrary markup safe - it is the caller's job to only supply markup
that is trusted.

There are two supported integration paths:

1. **Template-authored markup**, via the `embed_content` Twig block.
   Because it's written directly in a trusted `.twig` file, this path
   needs no further sanitization:

   ```twig
   {% embed "@components/embed/embed.twig" with { embed__heading: 'Our location' } %}
     {% block embed_content %}
       <iframe title="Map to our office" src="https://www.openstreetmap.org/export/embed.html?..." loading="lazy"></iframe>
     {% endblock %}
   {% endembed %}
   ```

2. **CMS/application-sanitized markup**, passed through the
   `embed_content` string prop. The consuming application (e.g. a
   Drupal field formatter with an allow-listed set of embed providers)
   is responsible for sanitizing/validating this value _before_ it
   reaches this component. Never forward raw end-user input into
   `embed_content`.

Do not bypass sanitization inside this component to work around that
requirement - trust decisions belong to the consuming application, not
the UI kit.

### Accessibility requirements for the supplied markup

- The `<iframe>` (or other embed element) you provide **must** include a
  descriptive `title` attribute. A missing title is invalid input for
  this component. It will be flagged automatically by the Storybook
  accessibility addon and by the project's `npm run a11y` pipeline
  (axe rule `frame-title`), since neither can inspect raw markup ahead
  of render time.
- The wrapper never sets `overflow: hidden` or a `tabindex` on the embed,
  so keyboard focus can reach the embedded content and its native focus
  outline is never clipped.
- Fullscreen is entirely controlled by the iframe you supply (its
  `allow="fullscreen"` / `allowfullscreen` attributes); this component
  neither adds nor strips fullscreen permissions.
- This component cannot guarantee the accessibility of third-party
  iframe contents - that responsibility sits with the embed provider.

### Responsive behavior

The aspect-ratio box uses CSS `aspect-ratio` exclusively - it does not
depend on JavaScript removing the iframe's `width`/`height` attributes
to become responsive (unlike `components/video/video-embed.js`). Leave
`width`/`height` on your `<iframe>` as intrinsic-dimension hints; this
component's CSS will still make it fill its container responsively, with
or without JavaScript enabled.

Supported `embed__ratio` presets: `16-9` (default), `4-3`, `1-1`, and
`custom` (paired with `embed__ratio_custom`, e.g. `21 / 9`).

### Recommended (not enforced) iframe attributes

Because embed markup is authored by the consumer rather than generated
by this component, attributes like `loading="lazy"` and
`referrerpolicy` live on your `<iframe>`, not on a component prop. We
recommend adding both, e.g. `loading="lazy"
referrerpolicy="strict-origin-when-cross-origin"`. Provider-specific
consent management, lazy-loading helpers, and privacy-enhanced URL
rewriting are intentionally out of scope for this component and are
candidates for follow-up work.
