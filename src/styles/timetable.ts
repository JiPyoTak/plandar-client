import { Theme, css } from '@emotion/react';

const TIMETABLE_SCROLL_WIDTH = '8px';
const TIMETABLE_SCROLL_STYLE = ({ theme }: { theme: Theme }) => css`
  &::-webkit-scrollbar {
    width: ${TIMETABLE_SCROLL_WIDTH};
    height: ${TIMETABLE_SCROLL_WIDTH};
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border-radius: 8px;
    border: none;
    background-color: ${theme.placeholder};
  }
`;

const TIMETABLE_CELL_MIN_WIDTH = '4.875rem';
const TIMETABLE_CELL_HEIGHT = '1rem';

const TIMETABLE_Z_INDEX = {
  timePlan: 2,
  timePlanHover: 3,
  timeCellHover: 1,
} as const;

export {
  TIMETABLE_SCROLL_WIDTH,
  TIMETABLE_SCROLL_STYLE,
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_CELL_HEIGHT,
  TIMETABLE_Z_INDEX,
};
