import { Union } from './union';
import { CALENDAR_UNIT } from '@/utils/constants';

type TCalendarUnit = Union<typeof CALENDAR_UNIT>;

export type { TCalendarUnit };
