import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableCellColumn from './TimetableCellColumn';
import TimetablePlanColumn from './TimetablePlanColumn';
import TimetableTimeline from './TimetableTimeline';
import Plan from '@/plan/Plan';
import {
  TIMETABLE_SCROLL_STYLE,
  TIMETABLE_CELL_MIN_WIDTH,
} from '@/styles/timetable';

type TProps = {
  dateMoments: Moment[];
  timePlans: Plan[];
};

const TimetableView: React.FC<TProps> = ({ dateMoments, timePlans }) => {
  const columnPlans = dateMoments.map((dateMoment) =>
    timePlans.filter(
      ({ startTime }) =>
        dateMoment.toDate().toDateString() ===
        new Date(startTime).toDateString(),
    ),
  );

  return (
    <Scroller>
      <Container>
        <TimetableTimeline />
        {dateMoments.map((dateMoment, i) => {
          const formattedDate = dateMoment.format('YYYY-MM-DD');
          const plans = columnPlans[i];

          return (
            <Column key={formattedDate}>
              <TimetablePlanColumn plans={plans} />
              <TimetableCellColumn
                dateMoment={dateMoment}
                formattedDate={formattedDate}
              />
            </Column>
          );
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

const Column = styled.div`
  flex: 1 0 0;
  min-width: ${TIMETABLE_CELL_MIN_WIDTH};

  border-left: 1px solid ${({ theme }) => theme.border2};
`;

export default TimetableView;
