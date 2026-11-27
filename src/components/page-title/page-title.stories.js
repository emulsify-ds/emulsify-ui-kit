import { renderTwig } from '@emulsify/core/storybook';

// Twig templates
import pageTitleTwig from './page-title.twig';

// Data files
import { argsFromSchema } from '../../util/argsFromSchema.js';
import imageSchema from '../image/image.component.yml';
import { props } from './page-title.component.yml';

const pageTitleData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Page Title',
  argTypes: {
    pageTitleHeading: {
      name: 'Heading',
      type: 'string',
    },
    pageTitleSubHeading: {
      name: 'Subheading',
      type: 'string',
    },
    pageTitlePrimaryLinkLabel: {
      name: 'Primary Link Label',
      type: 'string',
    },
    pageTitleSecondaryLinkLabel: {
      name: 'Secondary Link Label',
      type: 'string',
    },
    pageTitleTertiaryLinkLabel: {
      name: 'Tertiary Link Label',
      type: 'string',
    },
    pageTitleOverline: {
      name: 'Content',
      type: 'string',
    },
    pageTitleShowMedia: {
      name: 'Show Media',
      type: 'boolean',
    },
    pageTitleMediaShowCaption: {
      name: 'Show Media Caption',
      type: 'boolean',
      if: {
        arg: 'pageTitleShowMedia',
        truthy: true,
      },
    },
    pageTitleMediaCaption: {
      name: 'Media Caption',
      type: 'string',
      if: {
        arg: 'pageTitleMediaShowCaption',
        truthy: true,
      },
    },
    pageTitleMediaShowCopyright: {
      name: 'Show Media Copyright',
      type: 'boolean',
      if: {
        arg: 'pageTitleShowMedia',
        truthy: true,
      },
    },
    pageTitleMediaCopyright: {
      name: 'Media Copyright',
      type: 'string',
      if: {
        arg: 'pageTitleMediaShowCopyright',
        truthy: true,
      },
    },
    backgroundColor: {
      name: 'Background Color',
      control: {
        type: 'boolean',
      },
      defaultValue: false,
    },
    spacing: {
      name: 'Container Spacing',
      control: { type: 'select' },
      options: ['none', 'one', 'two', 'three'],
      table: {
        category: 'Container Controls',
      },
    },
    layout: {
      name: 'Container Layout',
      control: { type: 'select' },
      options: {
        Stacked: 'stacked',
        Inline: 'inline',
      },
      table: {
        category: 'Container Controls',
      },
    },
  },
  args: {
    pageTitleHeading: pageTitleData.page_title__heading.data,
    pageTitleSubHeading: pageTitleData.page_title__subheading.data,
    pageTitlePrimaryLinkLabel: '',
    pageTitleSecondaryLinkLabel: '',
    pageTitleTertiaryLinkLabel: '',
    pageTitleOverline: pageTitleData.page_title__overline.data,
    pageTitleShowMedia: false,
    pageTitleMediaShowCaption: false,
    pageTitleMediaCaption: pageTitleData.page_title__media__caption.data,
    pageTitleMediaShowCopyright: false,
    pageTitleMediaCopyright: pageTitleData.page_title__media__copyright.data,
    backgroundColor: false,
    spacing: 'two',
    layout: 'stacked',
  },
};

const renderPageTitle = ({
  pageTitleHeading,
  pageTitleSubHeading,
  pageTitlePrimaryLinkLabel,
  pageTitleSecondaryLinkLabel,
  pageTitleTertiaryLinkLabel,
  pageTitleOverline,
  pageTitleShowMedia,
  pageTitleMediaShowCaption,
  pageTitleMediaCaption,
  pageTitleMediaShowCopyright,
  pageTitleMediaCopyright,
  backgroundColor,
  spacing,
  layout,
}) => {
  const mediaProps = pageTitleShowMedia
    ? argsFromSchema(imageSchema.props)
    : {};

  return pageTitleTwig({
    ...mediaProps,
    page_title__heading: pageTitleHeading,
    page_title__subheading: pageTitleSubHeading,
    page_title__link_primary__label: pageTitlePrimaryLinkLabel,
    page_title__link_primary__url: '#',
    page_title__link_secondary__label: pageTitleSecondaryLinkLabel,
    page_title__link_secondary__url: '#',
    page_title__link_tertiary__label: pageTitleTertiaryLinkLabel,
    page_title__link_tertiary__url: '#',
    page_title__overline: pageTitleOverline,
    page_title__show_media: pageTitleShowMedia,
    page_title__media__show_caption: pageTitleMediaShowCaption,
    page_title__media__caption: pageTitleMediaCaption,
    page_title__media__show_copyright: pageTitleMediaShowCopyright,
    page_title__media__copyright: pageTitleMediaCopyright,
    page_title__bg_color: backgroundColor,
    page_title__spacing: spacing,
    page_title__layout: layout,
  });
};

export const pageTitle = { render: renderTwig(renderPageTitle) };
