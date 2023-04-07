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

const initialState = {
  year: moment().year(),
  month: moment().month() + 1,
  day: moment().date(),
} as const;

const useDateState = create<IDateStore>((set) => ({
  ...initialState,
  increaseStoreMonth: () => set(increaseMonth),
  decreaseStoreMonth: () => set(decreaseMonth),
  onChangeStoreDate: (props: TDateYMD) => set(props),
}));

export type { IDateStore, TDateYMD };
export default useDateState;
