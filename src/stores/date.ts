import moment from 'moment';
import type { Moment, MomentInput } from 'moment';
import { create } from 'zustand';

type TDateState = {
  referenceDate: Moment;
};

const initialState = {
  referenceDate: moment(),
} as const;

type TDateAction = {
  increaseStoreMonth: () => void;
  decreaseStoreMonth: () => void;
  setReferenceDate: (date: MomentInput) => void;
};

const useDateState = create<TDateState & TDateAction>((set) => ({
  ...initialState,
  increaseStoreMonth: () =>
    set(({ referenceDate }) => {
      return {
        referenceDate: moment(referenceDate).add(1, 'month'),
      };
    }),
  decreaseStoreMonth: () =>
    set(({ referenceDate }) => {
      return {
        referenceDate: moment(referenceDate).subtract(1, 'month'),
      };
    }),
  setReferenceDate: (date) => set({ referenceDate: moment(date) }),
}));

export default useDateState;
