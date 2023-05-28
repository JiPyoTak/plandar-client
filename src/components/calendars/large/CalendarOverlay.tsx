import React from 'react';

import styled from '@emotion/styled';

import useDateState from '@/stores/date';
import { ICalendarInfo } from '@/utils/calendar/getCalendarInfo';

interface IProps {
  week: ICalendarInfo[];
}

const CalendarOverlay = ({ week }: IProps) => {
  const { year, month } = useDateState();

  const getBackground = (y: number, m: number) => {
    if (y === year && m === month) return 'transparent';
    return 'rgba(255,255,255,.5)';
  };

  return (
    <Container>
      {week.map(({ year: y, month: m }, j) => (
        <Inner
          key={`${y}${m}${j}`}
          css={{
            backgroundColor: getBackground(y, m),
          }}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  z-index: 20;

  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
`;

const Inner = styled.div`
  position: relative;

  flex: 1;
  display: flex;
`;

export default CalendarOverlay;
