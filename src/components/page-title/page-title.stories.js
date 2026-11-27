import { renderTwig } from '@emulsify/core/storybook';
import { argsFromSchema } from '../../util/argsFromSchema.js';
import {
  createContainerThemeControls,
  createContainerWidthControls,
} from '../../util/storybookContainerControls.js';
import imageSchema from '../image/image.component.yml';
import image from '../image/image.twig';
import breadcrumbs from '../navigation/breadcrumbs/breadcrumbs.twig';
import schema from './page-title.component.yml';
import docs from './page-title.docs.js';
import template from './page-title.twig';

const widthControls = createContainerWidthControls();
const themeControls = createContainerThemeControls();

function preview({
  width,
  theme,
  themeVariation,
  breadcrumbsItems,
  mediaImage,
  ...args
}) {
  return template({
    ...args,
    page_title__width: width,
    page_title__theme: theme,
    page_title__theme__variation: themeVariation,
    page_title__breadcrumbs_content: breadcrumbsItems
      ? breadcrumbs({ breadcrumbs__items: breadcrumbsItems })
      : null,
    page_title__media_content: mediaImage ? image(mediaImage) : null,
  });
}

export default {
  title: 'Components/Page Title',
  tags: ['autodocs'],
  parameters: { docs },
  args: {
    ...argsFromSchema(schema.props),
    ...themeControls.args,
    width: 'wide',
    page_title__bg_color: true,
  },
  argTypes: {
    ...widthControls.argTypes,
    ...themeControls.argTypes,
    page_title__layout: {
      name: 'Media layout',
      control: 'select',
      options: ['inline', 'stacked'],
    },
    page_title__media_alignment: {
      name: 'Inline media placement',
      control: 'select',
      options: ['left', 'right'],
    },
    breadcrumbsItems: { control: false },
    mediaImage: { control: false },
  },
  render: (args, { viewMode } = {}) =>
    renderTwig(preview, { wrapper: viewMode === 'docs' ? 'div' : 'main' })(
      args,
    ),
};

export const PageTitle = {
  args: {
    page_title__overline: 'Collections',
    page_title__overline__url: '/collections',
    page_title__subheading: 'Find films, recordings, and production materials.',
    page_title__ctas: [
      { content: 'Browse titles', url: '/collections/film/titles' },
      { content: 'Plan a visit', url: '/visit' },
    ],
  },
};

export const WithBreadcrumbs = {
  args: {
    breadcrumbsItems: [
      { text: 'Home', url: '/' },
      { text: 'Collections', url: '/collections' },
      { text: 'Explore the film collection' },
    ],
  },
};

export const WithMedia = {
  args: {
    page_title__subheading: 'Discover how recording technology has changed.',
    page_title__description_content:
      '<p>The collection includes equipment from the first century of filmmaking.</p>',
    mediaImage: {
      ...argsFromSchema(imageSchema.props),
      image__caption: 'A camera from the collection.',
    },
    themeVariation: 'dark',
  },
};
