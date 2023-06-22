import { keyframes } from '@emotion/react';

const TOAST_COLLAPSE_DURATION = 300;

const TOAST_Z_INDEX = 9999;
const TOAST_WIDTH = `320px`;

const TOAST_MIN_HEIGHT = '64px';
const TOAST_MAX_HEIGHT = '800px';

const TOAST_BOUNCE_IN_RIGHT = keyframes`
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  from {
    opacity: 0;
    transform: translate3d(3000px, 0, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(-25px, 0, 0);
  }
  75% {
    transform: translate3d(10px, 0, 0);
  }
  90% {
    transform: translate3d(-5px, 0, 0);
  }
  to {
    transform: none;
  }
`;

const TOAST_BOUNCE_OUT_RIGHT = keyframes`
  20% {
    opacity: 1;
    transform: translate3d(-20px, 0, 0);
  }
  to {
    opacity: 0;
    transform: translate3d(2000px, 0, 0);
  }
`;

export {
  TOAST_COLLAPSE_DURATION,
  TOAST_WIDTH,
  TOAST_Z_INDEX,
  TOAST_MAX_HEIGHT,
  TOAST_MIN_HEIGHT,
  TOAST_BOUNCE_IN_RIGHT,
  TOAST_BOUNCE_OUT_RIGHT,
};
