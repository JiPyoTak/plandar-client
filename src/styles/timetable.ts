import { Theme, css } from '@emotion/react';
import styled from '@emotion/styled';

import { FONT_BOLD_8 } from './font';

const TimetableGuide = styled.div`
  ${FONT_BOLD_8}

  flex: 0 0 4rem;
  color: ${({ theme }) => theme.text4};

  text-align: end;
`;

const TIMETABLE_SCROLL_STYLE = ({ theme }: { theme: Theme }) => css`
  &::-webkit-scrollbar {
    width: 0.75rem;
    background-color: ${theme.background4};
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border-radius: 8px;
    border: none;
    background-color: ${theme.placeholder};
  }
`;

const TIMETABLE_CELL_MIN_WIDTH = '4.875rem';

export { TimetableGuide, TIMETABLE_SCROLL_STYLE, TIMETABLE_CELL_MIN_WIDTH };
