import React from 'react';

import styled from '@emotion/styled';

import CalendarView from './CalendarView';
import DOW from '@/components/common/calendar/DayOfWeek';

const Calendar = () => {
  return (
    <Container>
      <DayOfWeek />
      <CalendarView />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.white};

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
`;

const DayOfWeek = styled(DOW)`
  border-bottom: 1px solid ${({ theme }) => theme.border1};

  & > div {
    justify-content: flex-start;
    padding: 1rem;
  }
`;

export default Calendar;
