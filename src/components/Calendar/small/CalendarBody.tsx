import React, { memo } from 'react';

import styled from '@emotion/styled';

import Day from '@/components/common/calendar/Day';
import { TDateYMD } from '@/stores/date';
import { getCalendarInfo } from '@/utils/getCalendarInfo';

interface IProps {
  date: TDateYMD;
  onChangeDay: (date: TDateYMD) => void;
}

const CalendarBody = ({ date, onChangeDay }: IProps) => {
  const calendarInfos = getCalendarInfo(date);

  return (
    <Container>
      {calendarInfos.map((dateInfo) => (
        <CalendarBody.Day
          {...dateInfo}
          isSelected={dateInfo.day === date.day && dateInfo.isInMonth}
          onClick={onChangeDay}
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
`;

CalendarBody.Day = Day;

export default memo(CalendarBody);
