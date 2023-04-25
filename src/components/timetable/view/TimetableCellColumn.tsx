import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import { TIMETABLE_CELL_AMOUNT, TIMETABLE_CELL_UNIT } from '@/constants';
import { FONT_REGULAR_8 } from '@/styles/font';
import { TIMETABLE_CELL_HEIGHT, TIMETABLE_Z_INDEX } from '@/styles/timetable';
import { getTimeString } from '@/utils/date/getTimeString';

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
            <TimeSpan>{getTimeString(date)}</TimeSpan>
          </TimeCell>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const TimeCell = styled.div`
  width: 100%;
  height: ${TIMETABLE_CELL_HEIGHT};

  &:nth-of-type(4n) {
    border-bottom: 1px solid ${({ theme }) => theme.border2};
  }

  & > span {
    position: relative;
  }
  &:hover > span {
    z-index: ${TIMETABLE_Z_INDEX['timeCellHover']};

    color: ${({ theme }) => theme.primary};
    background-color: ${({ theme }) => theme.primary_light3};
    cursor: pointer;
  }
`;

const TimeSpan = styled.span`
  ${FONT_REGULAR_8}

  width: 100%;
  height: 100%;
  padding: 0.1rem 0.3rem;

  display: block;

  color: transparent;
  background-color: transparent;
  border-radius: 4px;
  transition-property: color, background-color;
  transition-duration: 0.2s;
`;

export default TimetableCellColumn;
