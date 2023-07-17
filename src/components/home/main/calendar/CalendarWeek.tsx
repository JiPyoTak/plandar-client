import React, { MouseEventHandler, memo } from 'react';

import styled from '@emotion/styled';

import CalendarCell from './CalendarCell';
import Plan from '@/core/plan/Plan';
import useDateState from '@/stores/date';
import { ICalendarInfo } from '@/utils/calendar/getCalendarInfo';

interface IProps {
  index: number;
  week: ICalendarInfo[];
  daysIndex: number[][];
  daysTimePlans: Plan[][];
  onMouseDown: MouseEventHandler;
}

const CalendarWeek = ({
  week,
  index,
  daysIndex,
  daysTimePlans,
  onMouseDown,
}: IProps) => {
  const day = useDateState(
    (store) => store.day,
    (prev, next) => prev === next,
  );

  return (
    <Container>
      {week.map((dateInfo, i) => (
        <CalendarCell
          key={`${dateInfo.month}${dateInfo.day}`}
          height={daysIndex[i].length * 24}
          isLastWeek={index === 5}
          isLastDay={i === 6}
          dateInfo={dateInfo}
          timePlans={daysTimePlans[i]}
          format={dateInfo.format}
          isSelected={dateInfo.day === day && dateInfo.isInMonth}
          onMouseDown={onMouseDown}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  flex: 1;
  display: flex;
`;

export default memo(CalendarWeek);
