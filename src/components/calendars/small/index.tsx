import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

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

  return (
    <Container>
      <CalendarHeader
        year={date.year}
        month={date.month}
        increaseMonth={increaseCalendarMonth}
        decreaseMonth={decreaseCalendarMonth}
      />
      <DayOfWeek />
      <CalendarBody date={date} onChangeDate={onChangeStoreDate} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
  font-size: 0.8rem;
  padding: 0 2rem 0 2rem;
`;

export default Calendar;
