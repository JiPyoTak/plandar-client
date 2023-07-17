import React from 'react';

import styled from '@emotion/styled';

import CalendarView from './CalendarView';
import DayOfWeek from '@/components/core/calendar/DayOfWeek';

const Calendar = () => {
  return (
    <Container>
      <CalendarDays />
      <CalendarView />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const CalendarDays = styled(DayOfWeek)`
  border-bottom: 1px solid ${({ theme }) => theme.border1};

  & > div {
    justify-content: flex-start;
    padding: 1rem 0.7rem;
  }
`;

export default Calendar;
