import { keyframes } from '@emotion/react';

const TOAST_COLLAPSE_DURATION = 300;

const TOAST_Z_INDEX = 9999;
const TOAST_WIDTH = `320px`;

const TOAST_MIN_HEIGHT = '64px';
const TOAST_MAX_HEIGHT = '800px';

const TOAST_BOUNCE_IN_BOTTOM = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const TOAST_BOUNCE_OUT_BOTTOM = keyframes`
  20% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
`;

export {
  TOAST_COLLAPSE_DURATION,
  TOAST_WIDTH,
  TOAST_Z_INDEX,
  TOAST_MAX_HEIGHT,
  TOAST_MIN_HEIGHT,
  TOAST_BOUNCE_IN_BOTTOM,
  TOAST_BOUNCE_OUT_BOTTOM,
};
