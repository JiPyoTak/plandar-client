import { Theme, css } from '@emotion/react';

const BOX_SCROLL_Y = ({ theme }: { theme: Theme }) => css`
  &::-webkit-scrollbar {
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    height: 50px;
    border: 2px solid transparent;
    border-top: none;
    border-bottom: none;
    border-radius: 4px;

    background-clip: padding-box;
    background-color: ${theme.border2};
  }

  &::-webkit-scrollbar-track-piece:end {
    background-color: transparent;
    margin-bottom: 6px;
  }

  &::-webkit-scrollbar-track-piece:start {
    background-color: transparent;
    margin-top: 6px;
  }
`;

export { BOX_SCROLL_Y };
