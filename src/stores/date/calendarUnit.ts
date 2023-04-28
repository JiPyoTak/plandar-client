import { create } from 'zustand';

import { CALENDAR_UNIT } from '@/constants';
import { TCalendarUnit } from '@/types';

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
