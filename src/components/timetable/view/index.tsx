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
    <Scroller>
      <Container>
        <TimetableTimeline />
        {dateMoments.map((dateMoment) => {
          const key = dateMoment.toDate().toString();
          return <TiemtableViewColumn key={key} dateMoment={dateMoment} />;
        })}
      </Container>
    </Scroller>
  );
};

const Scroller = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1 0 0;
  min-width: 100%;

  overflow-x: auto;
  overflow-y: auto;
`;

const Container = styled.div`
  display: flex;
`;

export default TimetableView;
