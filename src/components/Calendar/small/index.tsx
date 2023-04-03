import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';

import DayOfWeek from '@/components/common/calendar/DayOfWeek';
import useDateStore from '@/stores/date';
import { decrease, increase } from '@/utils/monthHandler';

const Calendar = () => {
  const dateState = useDateStore();
  const { onChangeDate: onChangeDay, year, month, day } = dateState;

  const [date, setDate] = useState({ year, month, day });

  useEffect(() => {
    setDate({ year, month, day });
  }, [year, month, day]);

  const increaseMonth = () => {
    setDate(increase);
  };

  const decreaseMonth = () => {
    setDate(decrease);
  };

  return (
    <Container>
      <CalendarHeader
        year={date.year}
        month={date.month}
        increaseMonth={increaseMonth}
        decreaseMonth={decreaseMonth}
      />
      <DayOfWeek />
      <CalendarBody date={date} onChangeDay={onChangeDay} />
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
