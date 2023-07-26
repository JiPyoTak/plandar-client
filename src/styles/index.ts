import { css, keyframes } from '@emotion/react';

import { theme } from '@/styles/theme';

const skeletonAnimation = keyframes`
  0% {
      background-color: ${theme.background4}33;
  }
  50% {
      background-color: ${theme.background4}66;
  }
  100% {
      background-color: ${theme.background4}33;
  }
`;

const SKELETON_BACKGROUND_STYLE = css`
  animation: ${skeletonAnimation} 2s infinite ease-in-out;
`;

export { SKELETON_BACKGROUND_STYLE };
