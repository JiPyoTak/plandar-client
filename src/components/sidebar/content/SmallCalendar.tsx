import React, { useEffect, useState } from 'react';

import moment from 'moment';

import Calendar from '@/components/calendars/small';

import useDateState from '@/stores/date';
import { decreaseMonth, increaseMonth } from '@/utils/calendar/monthHandler';

const SmallCalendar: React.FC = () => {
  const { onChangeStoreDate, year, month, day } = useDateState();

  const [date, setDate] = useState({ year, month, day });

  useEffect(() => {
    setDate({ year, month, day });
  }, [year, month, day]);

  const increaseCalendarMonth = () => {
    setDate(increaseMonth);
  };

  const decreaseCalendarMonth = () => {
    setDate(decreaseMonth);
  };

  const onClickTodayButton = () => {
    const today = moment();
    const date = {
      year: today.year(),
      month: today.month() + 1,
      day: today.date(),
    };

    setDate(date);
  };

  return (
    <Calendar
      today={{ year, month, day }}
      currentDate={date}
      onChangeDate={onChangeStoreDate}
      increaseMonth={increaseCalendarMonth}
      decreaseMonth={decreaseCalendarMonth}
      onClickTodayButton={onClickTodayButton}
    />
  );
};

export default SmallCalendar;
