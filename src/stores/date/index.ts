import moment from 'moment';
import { create } from 'zustand';

import { decreaseMonth, increaseMonth } from '@/utils/monthHandler';

type TDateYMD = Pick<IDateStore, 'day' | 'month' | 'year'>;

interface IDateStore {
  year: number;
  month: number;
  day: number;
  increaseStoreMonth: () => void;
  decreaseStoreMonth: () => void;
  onChangeStoreDate: (props: TDateYMD) => void;
}

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

const useDateState = create<IDateStore>((set) => ({
  ...initialState,
  increaseStoreMonth: () => set(increaseMonth),
  decreaseStoreMonth: () => set(decreaseMonth),
  onChangeStoreDate: (props: TDateYMD) => set(props),
}));

export type { IDateStore, TDateYMD };
export default useDateState;
