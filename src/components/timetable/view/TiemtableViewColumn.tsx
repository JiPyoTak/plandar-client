import React from 'react';

import styled from '@emotion/styled';

import { Moment } from 'moment';

import TimetableCell from './TimetableCell';
import { TIMETABLE_CELL_AMOUNT, TIMETABLE_CELL_UNIT } from '@/constants';
import { TIMETABLE_CELL_MIN_WIDTH } from '@/styles/timetable';

type TProps = {
  dateMoment: Moment;
};

const TiemtableViewColumn: React.FC<TProps> = ({ dateMoment }) => {
  return (
    <Container>
      {Array.from(Array(TIMETABLE_CELL_AMOUNT), (_, index) => {
        const date = dateMoment.toDate();
        date.setHours(Math.floor(index / TIMETABLE_CELL_AMOUNT));
        date.setMinutes(
          Math.floor((index % TIMETABLE_CELL_AMOUNT) * TIMETABLE_CELL_UNIT),
        );
        return <TimetableCell key={date.toString()} date={date} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  flex: 1 0 0;
  min-width: ${TIMETABLE_CELL_MIN_WIDTH};

  border-left: 1px solid ${({ theme }) => theme.border2};
`;

export default TiemtableViewColumn;
