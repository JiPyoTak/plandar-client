import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';

import DayOfWeek from '@/components/common/calendar/DayOfWeek';
import useDateState from '@/stores/date';
import { decreaseMonth, increaseMonth } from '@/utils/monthHandler';

const Calendar: React.FC = () => {
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
    <Container>
      <CalendarHeader
        year={date.year}
        month={date.month}
        increaseMonth={increaseCalendarMonth}
        decreaseMonth={decreaseCalendarMonth}
        onClickTodayButton={onClickTodayButton}
      />
      <DayOfWeek />
      <CalendarView
        date={date}
        storeDate={{ year, month, day }}
        onChangeDate={onChangeStoreDate}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
  font-size: 0.8rem;
`;

export default Calendar;
