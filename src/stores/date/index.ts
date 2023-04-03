import moment from 'moment';
import { create } from 'zustand';

import { decrease, increase } from '@/utils/monthHandler';

interface IDateStore {
  year: number;
  month: number;
  day: number;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  onChangeDate: (props: TDateYMD) => void;
}

type TDateYMD = Pick<IDateStore, 'day' | 'month' | 'year'>;

const initialState = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
} as const;

const useDateStore = create<IDateStore>((set) => ({
  ...initialState,

  increaseMonth: () => set(increase),
  decreaseMonth: () => set(decrease),
  onChangeDate: (props: TDateYMD) => {
    set(props);
  },
}));

export type { IDateStore, TDateYMD };
export default useDateStore;
