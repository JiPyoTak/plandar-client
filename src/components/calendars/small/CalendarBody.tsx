import React from 'react';

import styled from '@emotion/styled';

import CalendarDay from '@/components/common/calendar/CalendarDay';
import { TDateYMD } from '@/stores/date';
import { getCalendarInfo } from '@/utils/getCalendarInfo';

interface IProps {
  date: TDateYMD;
  onChangeDate: (date: TDateYMD) => void;
}

const CalendarBody = ({ date, onChangeDate }: IProps) => {
  const calendarInfos = getCalendarInfo(date).flatMap((week) => week);

  return (
    <Container>
      {calendarInfos.map((dateInfo) => (
        <CalendarBody.Day
          {...dateInfo}
          isSelected={dateInfo.day === date.day && dateInfo.isInMonth}
          onClick={onChangeDate}
          key={`${dateInfo.month}${dateInfo.day}`}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 1fr);

  align-items: stretch;
  justify-items: center;

  user-select: none;
`;

CalendarBody.Day = CalendarDay;

export default CalendarBody;
