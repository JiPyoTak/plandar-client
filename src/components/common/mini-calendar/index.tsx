import React from 'react';

import styled from '@emotion/styled';

import { Moment, MomentInput } from 'moment';

import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';

import DayOfWeek from '@/components/core/calendar/DayOfWeek';

interface IProps {
  referenceDate: Moment;
  selectedDate: Moment;
  setReferenceDate: (date: MomentInput) => void;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  onClickTodayButton: () => void;
}

const MiniCalendar: React.FC<IProps> = (props) => {
  const {
    referenceDate,
    selectedDate,
    setReferenceDate,
    increaseMonth,
    decreaseMonth,
    onClickTodayButton,
  } = props;

  return (
    <Container>
      <CalendarHeader
        year={selectedDate.year()}
        month={selectedDate.month()}
        increaseMonth={increaseMonth}
        decreaseMonth={decreaseMonth}
        onClickTodayButton={onClickTodayButton}
      />
      <DayOfWeek />
      <CalendarView
        referenceDate={referenceDate}
        selectedDate={selectedDate}
        onChangeDate={setReferenceDate}
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

export default MiniCalendar;
