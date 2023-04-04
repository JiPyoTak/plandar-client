import { Union } from './union';
import { CALENDAR_UNIT } from '@/utils/constants';

type TCalendarUnit = Union<typeof CALENDAR_UNIT>;

type TSize = 'small' | 'medium' | 'large' | string;

export type { TCalendarUnit, TSize };
