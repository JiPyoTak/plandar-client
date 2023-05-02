import { compareDays } from './dayHandler';
import { TDateYMD } from '@/stores/date';

const increaseMonth = (state: TDateYMD) => {
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
};

const decreaseMonth = (state: TDateYMD) => {
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
};

export { increaseMonth, decreaseMonth };
