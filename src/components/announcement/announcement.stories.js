import { renderTwig } from '@emulsify/core/storybook';
import announcementData from './announcement.component.yml';
import announcementTwig from './announcement.twig';

export default {
  title: 'Components/Announcement',
  render: renderTwig(announcementTwig),
  decorators: [
    (Story) => (
      <div className="cl-container">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    announcement__title: {
      name: 'Title',
      control: 'text',
    },
    announcement__content: {
      name: 'Content',
      control: 'text',
    },
    announcement__button_text: {
      name: 'Button Text',
      control: 'text',
    },
    announcement__button_url: {
      table: {
        disable: true,
      },
    },
    announcement__icon: {
      table: {
        disable: true,
      },
    },
    announcement__variant: {
      table: {
        disable: true,
      },
    },
  },
};

const { properties } = announcementData.props;

export const basic = {
  args: {
    announcement__title: properties.announcement__title.data,
    announcement__content: properties.announcement__content.data,
    announcement__button_text: properties.announcement__button_text.data,
    announcement__button_url: properties.announcement__button_url.data,
    announcement__icon: properties.announcement__icon.data,
    announcement__variant: properties.announcement__variant.data,
  },
};

export const light = {
  args: {
    ...basic.args,
    announcement__variant: 'light',
  },
};

export const dark = {
  args: {
    ...basic.args,
    announcement__variant: 'dark',
  },
};

export const noIcon = {
  args: {
    ...basic.args,
    announcement__icon: null,
  },
};
