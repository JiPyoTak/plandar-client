import { create } from 'zustand';

import { TCalendarUnit } from '@/types';
import { CALENDAR_UNIT } from '@/utils/constants';

interface ICalendarUnitState {
  selectedCalendarUnit: TCalendarUnit;
}

interface ICalendarUnitAction {
  selectCalendarUnit: (calendarUnit: TCalendarUnit) => void;
}

const initialState = {
  selectedCalendarUnit: CALENDAR_UNIT[2],
} as const;

const useCalendarUnitState = create<ICalendarUnitState & ICalendarUnitAction>(
  (set) => ({
    ...initialState,
    selectCalendarUnit: (calendarUnit: TCalendarUnit) =>
      set({ selectedCalendarUnit: calendarUnit }),
  }),
);

export default useCalendarUnitState;
