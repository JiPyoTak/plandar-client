import React from 'react';

import styled from '@emotion/styled';

import CalendarHeader from './CalendarHeader';
import CalendarView from './CalendarView';

import DayOfWeek from '@/components/core/calendar/DayOfWeek';
import { TDateYMD } from '@/stores/date';

interface IProps {
  today: TDateYMD;
  currentDate: TDateYMD;
  onChangeDate: (date: TDateYMD) => void;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  onClickTodayButton: () => void;
}

const MiniCalendar: React.FC<IProps> = (props) => {
  const {
    today,
    currentDate,
    onChangeDate,
    increaseMonth,
    decreaseMonth,
    onClickTodayButton,
  } = props;

  return (
    <Container>
      <CalendarHeader
        year={currentDate.year}
        month={currentDate.month}
        increaseMonth={increaseMonth}
        decreaseMonth={decreaseMonth}
        onClickTodayButton={onClickTodayButton}
      />
      <DayOfWeek />
      <CalendarView
        date={currentDate}
        storeDate={today}
        onChangeDate={onChangeDate}
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
