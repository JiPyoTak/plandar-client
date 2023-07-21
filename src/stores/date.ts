import moment from 'moment';
import { create } from 'zustand';

import { decreaseMonth, increaseMonth } from '@/utils/calendar/monthHandler';

type TDateState = {
  year: number;
  month: number;
  day: number;
};
type TDateYMD = Pick<TDateState, 'day' | 'month' | 'year'>;

type TDateAction = {
  increaseStoreMonth: () => void;
  decreaseStoreMonth: () => void;
  onChangeStoreDate: (props: TDateYMD) => void;
};

const getInitialDate = () => {
  const today = moment();

  return {
    year: today.year(),
    month: today.month() + 1,
    day: today.date(),
  };
};

const initialState = {
  ...getInitialDate(),
} as const;

const useDateState = create<TDateState & TDateAction>((set) => ({
  ...initialState,
  increaseStoreMonth: () => set(increaseMonth),
  decreaseStoreMonth: () => set(decreaseMonth),
  onChangeStoreDate: (props: TDateYMD) => set(props),
}));

export type { TDateYMD };
export default useDateState;
