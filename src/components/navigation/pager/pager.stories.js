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

/**
 * Storybook Definition.
 */
export default { title: 'Components/Navigation/Pager' };

export const basic = () => pagerTwig(pagerData);
export const withNext = () => pagerTwig(pagerNextEllipsesData);
export const withPrevious = () => pagerTwig(pagerPrevEllipsesData);
export const withBoth = () => pagerTwig(pagerBothEllipsesData);
export const withFirstAndLast = () => pagerTwig(pagerFirstLastData);
