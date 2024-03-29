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

const TIMETABLE_HIDE_SCROLL_STYLE = css`
  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    display: none;
  }
`;

const TIMETABLE_CELL_MIN_WIDTH = '4.875rem';
const TIMETABLE_CELL_HEIGHT = '1rem';

const TIMETABLE_ALL_DAY_VERTICAL_PADDING = 8;
const TIMETABLE_ALL_DAY_PLAN_HEIGHT = 24;

const TIMETABLE_Z_INDEX = {
  timePlan: 2,
  timePlanHover: 3,
  timeCellHover: 1,
} as const;

export {
  TIMETABLE_SCROLL_WIDTH,
  TIMETABLE_SCROLL_STYLE,
  TIMETABLE_HIDE_SCROLL_STYLE,
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_CELL_HEIGHT,
  TIMETABLE_ALL_DAY_VERTICAL_PADDING,
  TIMETABLE_ALL_DAY_PLAN_HEIGHT,
  TIMETABLE_Z_INDEX,
};
