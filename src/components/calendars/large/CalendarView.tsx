import React from 'react';

import styled from '@emotion/styled';

import CalendarCell from './CalendarCell';
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
            <CalendarBody.Cell
              key={`${dateInfo.month}${dateInfo.day}`}
              isLastWeek={i === calendarInfos.length - 1}
              isLastDay={dateInfo.day === week[week.length - 1].day}
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

CalendarBody.Cell = CalendarCell;
CalendarBody.Week = Week;

export default CalendarBody;
