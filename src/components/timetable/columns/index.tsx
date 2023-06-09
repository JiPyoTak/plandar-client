import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableScroller from '../TimetableScroller';

import TimetableCellColumn from './TimetableCellColumn';
import TimetablePlanColumn from './TimetablePlanColumn';
import TimetableSelected from './TimetableSelected';
import TimetableTimeline from './TimetableTimeline';
import usePlanDrag from '@/hooks/usePlanDrag';
import { TimetableViewMomentProvider } from '@/hooks/useTimetableViewMoment';
import Plan from '@/plan/Plan';
import { TIMETABLE_CELL_MIN_WIDTH } from '@/styles/timetable';
import getColumnPlans from '@/utils/plan/getColumnPlans';

type TProps = {
  dateMoments: Moment[];
  timePlans: Plan[];
};

const TimetableColumns: React.FC<TProps> = ({ dateMoments, timePlans }) => {
  const { currentDateRef, onMouseMove, changeCurrentDate } = usePlanDrag();

  const columnPlans = getColumnPlans(dateMoments, timePlans);

  return (
    <TimetableScroller.Vertical>
      <TimetableScroller.Horizontal
        scrollId="view"
        fixedComponent={<TimetableTimeline />}
      >
        <Container>
          {dateMoments.map((dateMoment, i) => {
            const plans = columnPlans[i];

            return (
              <TimePlanColumn
                key={dateMoment.toString()}
                onMouseMove={currentDateRef.current ? onMouseMove : undefined}
                onMouseDown={changeCurrentDate}
              >
                <TimetableViewMomentProvider value={dateMoment}>
                  <TimetablePlanColumn plans={plans} />
                  <TimetableSelected />
                  <TimetableCellColumn />
                </TimetableViewMomentProvider>
              </TimePlanColumn>
            );
          })}
        </Container>
      </TimetableScroller.Horizontal>
    </TimetableScroller.Vertical>
  );
};

const Container = styled.div`
  display: flex;
`;

const TimePlanColumn = styled.div`
  flex: 1 0 0;
  min-width: ${TIMETABLE_CELL_MIN_WIDTH};

  border-right: 1px solid ${({ theme }) => theme.border2};
`;

export default TimetableColumns;
