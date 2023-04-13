import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TiemtableViewColumn from './TiemtableViewColumn';
import TimetableTimeline from './TimetableTimeline';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

type TProps = {
  dateMoments: Moment[];
};

const TimetableView: React.FC<TProps> = ({ dateMoments }) => {
  return (
    <Container>
      <TimetableTimeline />
      {dateMoments.map((date) => {
        return <TiemtableViewColumn date={date} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1;

  width: 100%;
  height: 50px;

  display: flex;
`;

export default TimetableView;
