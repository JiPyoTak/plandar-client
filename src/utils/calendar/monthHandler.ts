const compareDays = (props: TDateYMD) => {
  const { year, month, day } = props;
  const lastDay = parseInt(
    moment({ year, month: month - 1 })
      .endOf('month')
      .format('D'),
  );

  return day > lastDay ? lastDay : day;
};

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
