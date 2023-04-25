import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import { TIMETABLE_CELL_AMOUNT, TIMETABLE_CELL_UNIT } from '@/constants';
import { FONT_REGULAR_8 } from '@/styles/font';
import { TIMETABLE_CELL_HEIGHT } from '@/styles/timetable';
import { timeToString } from '@/utils/timeToString';

type TProps = {
  dateMoment: Moment;
};

const TimetableCellColumn: React.FC<TProps> = ({ dateMoment }) => {
  return (
    <Container>
      {Array.from(Array(TIMETABLE_CELL_AMOUNT), (_, index) => {
        const date = dateMoment.toDate();
        date.setHours(Math.floor(index / TIMETABLE_CELL_AMOUNT));
        date.setMinutes(
          Math.floor((index % TIMETABLE_CELL_AMOUNT) * TIMETABLE_CELL_UNIT),
        );
        return (
          <TimeCell key={date.toString()}>
            <TimeSpan>{timeToString(date)}</TimeSpan>
          </TimeCell>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
`;

const TimeCell = styled.div`
  width: 100%;
  height: ${TIMETABLE_CELL_HEIGHT};

  &:nth-of-type(4n) {
    border-bottom: 1px solid ${({ theme }) => theme.border2};
  }

  &:hover > span {
    visibility: visible;
    cursor: pointer;
  }
`;

const TimeSpan = styled.span`
  ${FONT_REGULAR_8}

  width: 100%;
  height: 100%;
  padding: 0.1rem 0.3rem;

  display: block;
  visibility: hidden;

  color: ${({ theme }) => theme.primary};
  background-color: ${({ theme }) => theme.primary_light3};
  border-radius: 4px;
`;

export default TimetableCellColumn;
