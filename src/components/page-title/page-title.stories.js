// Twig templates
import pageTitleTwig from './page-title.twig';

// Data files
import imageData from '../image/image.yml';
import { props } from './page-title.component.yml';

const pageTitleData = props.properties;

/**
 * Storybook Definition.
 */
export default {
  title: 'Components/Headers/Page Title',
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
      options: {
        '0x Spacing': 'no-spacing',
        '1x Spacing': '',
        '2x Spacing': 'two-spacing',
        '3x Spacing': 'three-spacing',
      },
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
    spacing: 'two-spacing',
    layout: 'stacked',
  },
};

export const pageTitle = ({
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
    ? {
        ...imageData.responsive_images['3x2'],
      }
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
    page_title__container__modifiers: spacing ? [spacing] : [],
    page_title__layout: layout,
  });
};
