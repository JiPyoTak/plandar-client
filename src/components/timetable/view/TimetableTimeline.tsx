import React from 'react';

import styled from '@emotion/styled';

import { TIMETABLE_CELL_AMOUNT, TIMETABLE_CELL_PER_HOUR } from '@/constants';
import { TIMETABLE_CELL_HEIGHT, TimetableGuide } from '@/styles/timetable';
import { timeToString } from '@/utils/timeToString';

const TIMELINE_CELL_AMOUNT = Math.floor(
  TIMETABLE_CELL_AMOUNT / TIMETABLE_CELL_PER_HOUR,
);

const TimetableTimeline: React.FC = () => {
  return (
    <Container>
      {Array.from(Array(TIMELINE_CELL_AMOUNT), (_, index) => {
        const isFirst = index === 0;
        const date = new Date();
        date.setHours(index);

        return (
          <HourSpace key={index}>
            {!isFirst && (
              <HourSpan>{timeToString(date, { showMinutes: false })}</HourSpan>
            )}
          </HourSpace>
        );
      })}
    </Container>
  );
};

const Container = styled(TimetableGuide)``;

const HourSpace = styled.div`
  padding: 0 0.25rem;
  width: 100%;
  height: calc(${TIMETABLE_CELL_HEIGHT} * ${TIMETABLE_CELL_PER_HOUR});
`;

const HourSpan = styled.span`
  width: 100%;

  display: block;
  transform: translateY(-50%);
`;

export default TimetableTimeline;
