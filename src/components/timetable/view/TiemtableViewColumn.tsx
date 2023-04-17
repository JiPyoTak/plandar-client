import React from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import { Moment } from 'moment';

import TimetableCell from './TimetableCell';
import { TIMETABLE_CELL_MIN_WIDTH } from '@/styles/timetable';
import { TIMETABLE_CELL_AMOUNT } from '@/utils/constants';

type TProps = {
  date: Moment;
};

const TiemtableViewColumn: React.FC<TProps> = ({ date }) => {
  return (
    <Container>
      {Array.from(Array(TIMETABLE_CELL_AMOUNT), () => {
        return <TimetableCell />;
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
