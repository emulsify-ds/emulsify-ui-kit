import announcementTwig from './announcement.twig';
import { props } from './announcement.component.yml';
import announcementDarkIcon from '../../images/example/announcement-icon--dark.svg';
import announcementLightIcon from '../../images/example/announcement-icon--light.svg';

export default {
  title: 'Components/Announcement',
  decorators: [
    (story) =>
      `<div style="max-width: 1121px; margin: 0 auto;">${story()}</div>`,
  ],
};

const icons = {
  'icon-light': announcementLightIcon,
  'icon-dark': announcementDarkIcon,
}

function getAnnouncementData(data) {
  const newData = Object.assign({}, data);
  if (data && typeof data === 'object' && 'announcement__icon' in data) {
    newData.announcement__icon = icons[data.announcement__icon];
  }
  return newData;
}

export const Announcement = () =>
  `<div class="announcement-list">${props.example
    .map((data) => announcementTwig(getAnnouncementData(data)))
    .join('')}</div>`;
