import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import { TIMETABLE_CELL_MIN_WIDTH, TimetableGuide } from '@/styles/timetable';

type TProps = {
  dateMoments: Moment[];
};

const TimetableAllDay: React.FC<TProps> = ({ dateMoments }) => {
  return (
    <Container>
      <TimetableGuide css={{ margin: 'auto 0' }}>종일</TimetableGuide>
      {dateMoments.map(() => {
        return <AllDayItem></AllDayItem>;
      })}
    </Container>
  );
};

const Container = styled.div`
  flex: 0;

  width: 100%;
  min-height: 1.75rem;

  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.border2};
  user-select: none;
`;

const AllDayItem = styled.div`
  flex: 1;

  min-width: ${TIMETABLE_CELL_MIN_WIDTH};
`;

export default TimetableAllDay;
