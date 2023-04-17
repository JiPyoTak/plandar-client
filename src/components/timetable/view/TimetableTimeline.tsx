import React from 'react';

import styled from '@emotion/styled';

import { TIMETABLE_CELL_HEIGHT, TimetableGuide } from '@/styles/timetable';
import {
  TIMETABLE_CELL_AMOUNT,
  TIMETABLE_CELL_PER_HOUR,
} from '@/utils/constants';

const TIMELINE_CELL_AMOUNT = Math.floor(
  TIMETABLE_CELL_AMOUNT / TIMETABLE_CELL_PER_HOUR,
);

const TimetableTimeline: React.FC = () => {
  return (
    <Container>
      {Array.from(Array(TIMELINE_CELL_AMOUNT), (_, index) => {
        const isFirst = index === 0;
        const isAnteMeridium = index < 12;
        const time = index > 12 ? index - 12 : index;
        return (
          <HourSpace>
            {!isFirst && (
              <HourSpan>
                {isAnteMeridium ? '오전' : '오후'} {time}시
              </HourSpan>
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
