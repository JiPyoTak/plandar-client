import React from 'react';

import styled from '@emotion/styled';

import { Moment } from 'moment';

import TimetableCell from './TimetableCell';
import { TIMETABLE_CELL_AMOUNT } from '@/constants';
import { TIMETABLE_CELL_MIN_WIDTH } from '@/styles/timetable';

type TProps = {
  date: Moment;
};

const TiemtableViewColumn: React.FC<TProps> = ({ date }) => {
  return (
    <Container>
      {Array.from(Array(TIMETABLE_CELL_AMOUNT), (_, index) => {
        return <TimetableCell key={index} />;
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
