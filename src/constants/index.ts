import { theme } from '@/styles/theme';
import { TColor } from '@/types';

const CALENDAR_UNIT = ['일', '주', '월'] as const;

const DAY_OF_WEEK_UNIT = ['일', '월', '화', '수', '목', '금', '토'] as const;

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
].map((colorName) => theme[colorName as keyof typeof theme] as TColor);

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
const ACCESS_TOKEN_KEY = import.meta.env.VITE_APP_ACCESS_TOKEN_KEY;

export {
  CALENDAR_UNIT,
  DAY_OF_WEEK_UNIT,
  SELECTABLE_COLOR,
  SERVER_URL,
  ACCESS_TOKEN_KEY,
};
export * from './plan';
