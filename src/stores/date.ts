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
  increaseStoreMonth: () => void;
  decreaseStoreMonth: () => void;
  setReferenceDate: (date: MomentInput) => void;
  setCalendarUnit: (calendarUnit: TCalendarUnit) => void;
};

const useDateState = create<TDateState & TDateAction>((set) => ({
  ...initialState,
  increaseStoreMonth: () =>
    set(({ referenceDate, calendarUnit }) => {
      return {
        referenceDate: moment(referenceDate).add(1, calendarUnit),
      };
    }),
  decreaseStoreMonth: () =>
    set(({ referenceDate, calendarUnit }) => {
      return {
        referenceDate: moment(referenceDate).subtract(1, calendarUnit),
      };
    }),
  setReferenceDate: (date) => set({ referenceDate: moment(date) }),
  setCalendarUnit: (calendarUnit) => set({ calendarUnit }),
}));

export default useDateState;
