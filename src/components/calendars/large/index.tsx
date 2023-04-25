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
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const DayOfWeek = styled(DOW)`
  border-bottom: 1px solid ${({ theme }) => theme.border1};

  & > div {
    justify-content: flex-start;
    padding: 1rem 0.7rem;
  }
`;

export default Calendar;
