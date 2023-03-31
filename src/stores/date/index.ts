import moment from 'moment';
import { create } from 'zustand';

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

const compareDays = (props: TDateYMD) => {
  const { year, month, day } = props;
  const lastDay = parseInt(
    moment({ year, month: month - 1 })
      .endOf('month')
      .format('D'),
  );

  return day > lastDay ? lastDay : day;
};

const useDateStore = create<IDateStore>((set) => ({
  ...initialState,

  increaseMonth: () =>
    set((state) => {
      const newDate: TDateYMD = {
        ...state,
      };

      if (state.month === 12) {
        newDate.year = state.year + 1;
        newDate.month = 1;
      } else {
        newDate.month = state.month + 1;
      }

      const day = compareDays(newDate);

      return { ...newDate, day };
    }),
  decreaseMonth: () =>
    set((state) => {
      const newDate: TDateYMD = {
        ...state,
      };

      if (state.month === 1) {
        newDate.year = state.year - 1;
        newDate.month = 12;
      } else {
        newDate.month = state.month - 1;
      }

      const day = compareDays(newDate);

      return { ...newDate, day };
    }),
  onChangeDate: (props: TDateYMD) => {
    set(props);
  },
}));

export type { IDateStore, TDateYMD };
export default useDateStore;
