import { Union } from './union';
import { CALENDAR_UNIT, DAY_OF_WEEK_UNIT } from '@/utils/constants';
import { ICalendarInfo } from '@/utils/getCalendarInfo';

type TCalendarUnit = Union<typeof CALENDAR_UNIT>;
type TDayOfWeekUnit = Union<typeof DAY_OF_WEEK_UNIT>;

type TSize = 'small' | 'medium' | 'large' | string;

type TDirection = 'left' | 'right' | 'top' | 'bottom' | 'all';

type TPickIsBoolean = Pick<
  ICalendarInfo,
  'isToday' | 'isInMonth' | 'isWeekend'
> & { isSelected: boolean };

export type {
  TCalendarUnit,
  TSize,
  TDirection,
  TDayOfWeekUnit,
  TPickIsBoolean,
};
