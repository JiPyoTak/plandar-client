import React from 'react';

import styled from '@emotion/styled';

import CalendarCeil from './CalendarCeil';
import useDateState from '@/stores/date';
import { getCalendarInfo } from '@/utils/getCalendarInfo';

const CalendarBody = () => {
  const { onChangeStoreDate, year, month, day } = useDateState();
  const calendarInfos = getCalendarInfo({ year, month, day });

  const onClickDayContent = () => {
    console.log('onClickDayContent');
  };

  return (
    <Container>
      {calendarInfos.map((week, i) => (
        <CalendarBody.Week key={`${week[0].day}${i}`}>
          {week.map((dateInfo) => (
            <CalendarBody.Ceil
              key={`${dateInfo.month}${dateInfo.day}`}
              dateInfo={dateInfo}
              isSelected={dateInfo.day === day && dateInfo.isInMonth}
              onClickDayNumber={onChangeStoreDate}
              onClickDayContent={onClickDayContent}
            />
          ))}
        </CalendarBody.Week>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  flex: 1;

  display: flex;
  flex-flow: column;
  align-items: stretch;
`;

const Week = styled.div`
  flex: 1;
  display: flex;
`;

CalendarBody.Ceil = CalendarCeil;
CalendarBody.Week = Week;

export default CalendarBody;
