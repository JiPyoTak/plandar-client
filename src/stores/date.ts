import moment from 'moment';
import type { Moment, MomentInput } from 'moment';
import { create } from 'zustand';

import { CALENDAR_UNIT } from '@/constants';
import { TCalendarUnit } from '@/types';

type TDateState = {
  referenceDate: Moment;
  calendarUnit: TCalendarUnit;
};

const initialState = {
  referenceDate: moment(),
  calendarUnit: CALENDAR_UNIT[2],
} as const;

type TDateAction = {
  setReferenceDate: (date: MomentInput) => void;
  setCalendarUnit: (calendarUnit: TCalendarUnit) => void;
  increaseReferenceDate: () => void;
  decreaseReferenceDate: () => void;
};

const useDateState = create<TDateState & TDateAction>((set) => ({
  ...initialState,
  setReferenceDate: (date) => set({ referenceDate: moment(date) }),
  setCalendarUnit: (calendarUnit) => set({ calendarUnit }),
  increaseReferenceDate: () =>
    set(({ referenceDate, calendarUnit }) => {
      return {
        referenceDate: moment(referenceDate).add(1, calendarUnit),
      };
    }),
  decreaseReferenceDate: () =>
    set(({ referenceDate, calendarUnit }) => {
      return {
        referenceDate: moment(referenceDate).subtract(1, calendarUnit),
      };
    }),
}));

export default useDateState;
