import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import {
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_SCROLL_WIDTH,
  TimetableGuide,
} from '@/styles/timetable';

type TProps = {
  dateMoments: Moment[];
  allDayPlans: any[];
};

const TimetableAllDay: React.FC<TProps> = ({ dateMoments, allDayPlans }) => {
  return (
    <Container>
      <TimetableGuide
        css={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        종일
      </TimetableGuide>
      {dateMoments.map((_, index) => {
        return <AllDayItem key={index} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  flex: 0 0 0;

  min-height: 1.75rem;
  padding-right: ${TIMETABLE_SCROLL_WIDTH};

  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.border2};
  user-select: none;
`;

const AllDayItem = styled.div`
  flex: 1 0 auto;

  min-width: ${TIMETABLE_CELL_MIN_WIDTH};
`;

export default TimetableAllDay;
