import announcementTwig from './announcement.twig';
import { props } from './announcement.component.yml';
import announcementIcon from '../../../assets/icons/star-solid.svg';

export default {
  title: 'Components/Announcement',
  decorators: [
    (story) =>
      `<div style="max-width: 1121px; margin: 0 auto;">${story()}</div>`,
  ],
};

const icons = {
  'icon-light': announcementIcon,
  'icon-dark': announcementIcon,
};

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
