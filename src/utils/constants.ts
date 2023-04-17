import { theme } from '@/styles/theme';
import { TColor } from '@/types';

const CALENDAR_UNIT = ['일', '주', '월'] as const;

const DAY_OF_WEEK_UNIT = ['일', '월', '화', '수', '목', '금', '토'] as const;

const DAY_TO_MINUTE = 24 * 60;
const TIMETABLE_CELL_UNIT = 15;
const TIMETABLE_CELL_AMOUNT = Math.ceil(DAY_TO_MINUTE / TIMETABLE_CELL_UNIT);
const TIMETABLE_CELL_PER_HOUR = Math.floor(60 / TIMETABLE_CELL_UNIT);

const SELECTABLE_COLOR: ReadonlyArray<TColor> = [
  'primary',
  'primary_dark',
  'red',
  'red_dark',
  'orange',
  'orange_dark',
  'emerald_dark1',
  'emerald_dark2',
  'blue',
  'blue_dark',
].map((colorName) => theme[colorName as keyof typeof theme]);

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
const ACCESS_TOKEN_KEY = import.meta.env.VITE_APP_ACCESS_TOKEN_KEY;

export {
  CALENDAR_UNIT,
  DAY_OF_WEEK_UNIT,
  SERVER_URL,
  ACCESS_TOKEN_KEY,
  DAY_TO_MINUTE,
  TIMETABLE_CELL_UNIT,
  TIMETABLE_CELL_AMOUNT,
  TIMETABLE_CELL_PER_HOUR,
  SELECTABLE_COLOR,
};
