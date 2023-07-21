import { theme } from '@/styles/theme';
import { TColor } from '@/types';

const DATE_FORMAT = 'YYYY-MM-DD';

const CALENDAR_UNIT = ['일', '주', '월'] as const;

const DAY_OF_WEEK_UNIT = ['일', '월', '화', '수', '목', '금', '토'] as const;

const SELECTABLE_COLOR: ReadonlyArray<TColor> = [
  'primary_light',
  'blue',
  'red',
  'orange',
  'emerald_dark1',
  'primary',
  'blue_dark',
  'red_dark',
  'orange_dark',
  'emerald_dark2',
].map((colorName) => theme[colorName as keyof typeof theme] as TColor);

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
const ACCESS_TOKEN_KEY = import.meta.env.VITE_APP_ACCESS_TOKEN_KEY;

export {
  DATE_FORMAT,
  CALENDAR_UNIT,
  DAY_OF_WEEK_UNIT,
  SERVER_URL,
  ACCESS_TOKEN_KEY,
  SELECTABLE_COLOR,
};
export * from './plan';
export * from './timetable';
