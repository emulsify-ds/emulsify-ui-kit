import { renderTwig } from '@emulsify/core/storybook';

import pagerTwig from './pager.twig';
import { mapDataToTwig } from '../../../util/dataTransformers.js';

import { props as pagerProps } from './pager.component.yml';
import { props as pagerNextEllipsesProps } from './pager-next-ellipses.yml';
import { props as pagerPrevEllipsesProps } from './pager-prev-ellipses.yml';
import { props as pagerBothEllipsesProps } from './pager-both-ellipses.yml';
import { props as pagerFirstLastProps } from './pager-first-last.yml';

const pagerData = mapDataToTwig(pagerProps.properties);
const pagerNextEllipsesData = mapDataToTwig(pagerNextEllipsesProps.properties);
const pagerPrevEllipsesData = mapDataToTwig(pagerPrevEllipsesProps.properties);
const pagerBothEllipsesData = mapDataToTwig(pagerBothEllipsesProps.properties);
const pagerFirstLastData = mapDataToTwig(pagerFirstLastProps.properties);

export default {
  title: 'Components/Navigation/Pager',
  render: renderTwig(pagerTwig),
};

export const basic = {
  args: {
    ...pagerData,
  },
};

export const withNext = {
  args: {
    ...pagerNextEllipsesData,
  },
};

export const withPrevious = {
  args: {
    ...pagerPrevEllipsesData,
  },
};

export const withBoth = {
  args: {
    ...pagerBothEllipsesData,
  },
};

export const withFirstAndLast = {
  args: {
    ...pagerFirstLastData,
  },
};
