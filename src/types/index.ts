import { Union } from './union';
import { CALENDAR_UNIT, SELECTABLE_COLOR } from '@/utils/constants';

type TCalendarUnit = Union<typeof CALENDAR_UNIT>;

type TSize = 'small' | 'medium' | 'large' | string;

type TDirection = 'left' | 'right' | 'top' | 'bottom' | 'all';

type TSelectableColor = Union<typeof SELECTABLE_COLOR>;

export type { TCalendarUnit, TSize, TDirection, TSelectableColor };
