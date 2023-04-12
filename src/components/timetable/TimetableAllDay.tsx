import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import { TimetableGuide } from '@/styles/timetable';

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
  width: 100%;
  min-height: 1.75rem;

  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.border2};
  user-select: none;
`;

const AllDayItem = styled.div`
  flex: 1;
`;

export default TimetableAllDay;
