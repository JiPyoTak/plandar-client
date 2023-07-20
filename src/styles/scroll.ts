import { Theme, css } from '@emotion/react';

const BOX_SCROLL_Y = ({ theme }: { theme: Theme }) => css`
  &::-webkit-scrollbar {
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    border: 4px solid transparent;

    border-radius: 8px;

    background-clip: padding-box;
    background-color: ${theme.border2};
  }
`;

export { BOX_SCROLL_Y };
