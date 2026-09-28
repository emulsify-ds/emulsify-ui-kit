import embedTwig from './embed.twig';
import { props } from './embed.component.yml';

const embedData = props.properties;

/**
 * Storybook Definition.
 *
 * Every embed source below uses a privacy-conscious or mock URL:
 * youtube-nocookie.com, player.vimeo.com, and OpenStreetMap's export
 * embed don't require API keys or set third-party cookies on load, and
 * the "Mock widget" option points at example.com purely to illustrate
 * markup shape.
 */
const EMBED_SOURCES = {
  'YouTube video (16:9)': embedData.embed_content.data,
  'Vimeo video (square)':
    '<iframe title="Sample square video" src="https://player.vimeo.com/video/76979871" width="640" height="640" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>',
  'OpenStreetMap (4:3)':
    '<iframe title="Map of central London" src="https://www.openstreetmap.org/export/embed.html?bbox=-0.489%2C51.28%2C0.236%2C51.686&amp;layer=mapnik" width="600" height="450" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
  'Mock widget':
    '<iframe title="Newsletter signup form" src="https://example.com/embed/newsletter-signup-form" width="600" height="450" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
};

export default {
  title: 'Components/Embed',
  argTypes: {
    heading: {
      name: 'Heading',
      control: 'text',
    },
    headingLevel: {
      name: 'Heading level',
      control: { type: 'select' },
      options: ['1', '2', '3', '4', '5', '6'],
    },
    text: {
      name: 'Introductory text',
      control: 'text',
    },
    caption: {
      name: 'Caption',
      control: 'text',
    },
    source: {
      name: 'Embed source',
      control: { type: 'select' },
      options: EMBED_SOURCES,
    },
    ratio: {
      name: 'Aspect ratio',
      control: { type: 'select' },
      options: ['16-9', '4-3', '1-1', 'custom'],
    },
    ratioCustom: {
      name: 'Custom ratio (used when ratio = "custom")',
      control: 'text',
    },
    width: {
      name: 'Container width',
      control: { type: 'select' },
      options: {
        Compressed: 'compressed',
        Standard: 'standard',
        Extended: 'extended',
        Max: 'max',
        Full: 'full',
      },
    },
    alignment: {
      name: 'Container alignment',
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
    theme: {
      name: 'Container theme',
      control: { type: 'select' },
      options: { Default: '', Inverse: 'inverse' },
    },
    backgroundColor: {
      name: 'Container background',
      control: 'boolean',
    },
  },
  args: {
    heading: embedData.embed__heading.data,
    headingLevel: embedData.embed__heading_level.data,
    text: embedData.embed__text.data,
    caption: embedData.embed__caption.data,
    source: EMBED_SOURCES['YouTube video (16:9)'],
    ratio: '16-9',
    ratioCustom: embedData.embed__ratio_custom.data,
    width: embedData.embed__width.data,
    alignment: embedData.embed__alignment.data,
    theme: '',
    backgroundColor: false,
  },
};

// A single, controls-driven example. Use the Controls panel to explore
// aspect ratios (16:9, 4:3, 1:1, custom), embed sources (video/map/mock
// widget), container width/alignment/theme/background, and to confirm
// no heading/intro wrapper renders when heading and text are cleared.
export const embed = ({
  heading,
  headingLevel,
  text,
  caption,
  source,
  ratio,
  ratioCustom,
  width,
  alignment,
  theme,
  backgroundColor,
}) =>
  embedTwig({
    embed__heading: heading,
    embed__heading_level: headingLevel,
    embed__text: text,
    embed__caption: caption,
    embed_content: source,
    embed__ratio: ratio,
    embed__ratio_custom: ratioCustom,
    embed__width: width,
    embed__alignment: alignment,
    embed__theme: theme,
    embed__bg_color: backgroundColor,
  });
