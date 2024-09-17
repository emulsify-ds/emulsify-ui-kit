import breakpointsTwig from './breakpoints.twig';
import breakpointsData from './breakpoints.yml';

export default {
  title: 'Base/Breakpoints',
};

export const breakpoints = () =>
  `<div class="cl-container">${breakpointsTwig(breakpointsData)}</div>`;
