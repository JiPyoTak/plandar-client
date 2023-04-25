import { Moment } from 'moment';

import { IPlan } from './rq/plan';
import { Union } from './union';
import { CALENDAR_UNIT, DAY_OF_WEEK_UNIT } from '@/constants';
import { ICalendarInfo } from '@/utils/getCalendarInfo';

type TCalendarUnit = Union<typeof CALENDAR_UNIT>;
type TDayOfWeekUnit = Union<typeof DAY_OF_WEEK_UNIT>;

type TSize = 'small' | 'medium' | 'large' | string;

type TDirection = 'left' | 'right' | 'top' | 'bottom' | 'all';

type TColor = `#${string}`;

type TPickIsBoolean = Pick<
  ICalendarInfo,
  'isToday' | 'isInMonth' | 'isWeekend'
> & { isSelected: boolean };

interface IViewPlanInfo {
  id: number;
  termInWeek: number;
  weekOfMonth: number;
  dayOfWeek: number;
  termInMonth: number;
  viewStart: Moment;
  viewEnd: Moment;
  startTime: Moment;
  endTime: Moment;
  plan: IPlan | null;
}

export type {
  TCalendarUnit,
  TSize,
  TDirection,
  TDayOfWeekUnit,
  TColor,
  TPickIsBoolean,
  IViewPlanInfo,
};