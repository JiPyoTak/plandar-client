import { css } from '@emotion/react';

import styled from '@emotion/styled';

import { FONT_BOLD_2 } from '@/styles/font';

interface IColor {
  width: number;
  height: number;
  backgroundColor: string;
}

const Color = styled.div<IColor>`
  ${({ width, height, backgroundColor }) => ({
    width,
    height,
    backgroundColor,
  })}
  border-radius: 50%;
`;

const TITLE_STYLE = css`
  ${FONT_BOLD_2};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export { TITLE_STYLE, Color };
