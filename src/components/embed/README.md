---
title: Embed
---

### Generate a titled iframe

Supply a URL and a descriptive title. The shared Container provides section width, spacing, and theme, and the media box supplies the responsive aspect ratio.

```twig
{{ include('@components/embed/embed.twig', {
  embed__src: 'https://www.youtube-nocookie.com/embed/VIDEO_ID',
  embed__title: 'Tour of the makerspace',
  embed__heading: 'Visit the makerspace',
  embed__caption: 'Recorded during the spring open house.',
}, with_context: false) }}
```

### Compose trusted markup

Use the `embed__content` slot for markup authored in a trusted template. For content managed by a CMS, pass sanitized markup in `embed__iframe`. The caller supplies the trusted fragment and controls provider permissions. Give every iframe a descriptive, nonempty `title`.

```twig
{% embed '@components/embed/embed.twig' with {
  embed__heading: 'Find the library',
  embed__ratio: '4-3',
} only %}
  {% block embed__content %}
    <iframe title="Map of the library neighborhood"
      src="https://www.openstreetmap.org/export/embed.html?bbox=-0.133%2C51.517%2C-0.121%2C51.524&amp;layer=mapnik"
      loading="lazy"></iframe>
  {% endblock %}
{% endembed %}
```

See [the component schema](embed.component.yml) for the prop list and **Components → Embed** in Storybook for examples.
