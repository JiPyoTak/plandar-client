import { theme } from '@/styles/theme';

const CALENDAR_UNIT = ['일', '주', '월'] as const;

const DAY_OF_WEEK_UNIT = ['일', '월', '화', '수', '목', '금', '토'] as const;

const SELECTABLE_COLOR: ReadonlyArray<keyof typeof theme> = [
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
] as const;

export { CALENDAR_UNIT, DAY_OF_WEEK_UNIT, SELECTABLE_COLOR };
