import React from 'react';

import styled from '@emotion/styled';

import useDateState from '@/stores/date';
import { ICalendarInfo } from '@/utils/calendar/getCalendarInfo';

interface IProps {
  week: ICalendarInfo[];
}

const CalendarOverlay = ({ week }: IProps) => {
  const { year, month } = useDateState();

  return (
    <Container>
      {week.map(({ year: y, month: m }, j) => (
        <Inner
          key={`${y}${m}${j}`}
          css={{
            backgroundColor:
              y === year && m === month
                ? 'transparent'
                : 'rgba(255,255,255,.4)',
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
