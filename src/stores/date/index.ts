import { create } from 'zustand';

import { decreaseMonth, increaseMonth } from '@/utils/monthHandler';

interface IDateStore {
  year: number;
  month: number;
  day: number;
  increaseStoreMonth: () => void;
  decreaseStoreMonth: () => void;
  onChangeStoreDate: (props: TDateYMD) => void;
}

type TDateYMD = Pick<IDateStore, 'day' | 'month' | 'year'>;

const initialState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
} as const;

const useDateStore = create<IDateStore>((set) => ({
  ...initialState,

  increaseStoreMonth: () => set(increaseMonth),
  decreaseStoreMonth: () => set(decreaseMonth),
  onChangeStoreDate: (props: TDateYMD) => {
    set(props);
  },
}));

export type { IDateStore, TDateYMD };
export default useDateStore;
