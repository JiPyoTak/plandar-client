import { css } from '@emotion/react';

import { FONT_BOLD_2 } from '@/styles/font';

interface IColor {
  width: number;
  height: number;
  backgroundColor: string;
}

const COLOR = ({ width, height, backgroundColor }: IColor) =>
  css({
    width,
    height,
    backgroundColor,
    borderRadius: '50%',
  });

const TITLE = css`
  ${FONT_BOLD_2};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export { TITLE, COLOR };
