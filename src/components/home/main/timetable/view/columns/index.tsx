import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableCellColumn from './TimetableCellColumn';
import TimetablePlanColumn from './TimetablePlanColumn';
import TimetableSelected from './TimetableSelected';
import TimetableTimeline from './TimetableTimeline';
import TimetableScroll from '@/components/home/main/timetable/TimetableScroll';
import Plan from '@/core/plan/Plan';
import usePlanDrag from '@/hooks/usePlanDrag';
import { TimetableViewMomentProvider } from '@/hooks/useTimetableViewMoment';
import { TIMETABLE_CELL_MIN_WIDTH } from '@/styles/timetable';
import getColumnPlans from '@/utils/plan/getColumnPlans';

type TProps = {
  dateMoments: Moment[];
  timePlans: Plan[];
  onMouseMove: ReturnType<typeof usePlanDrag>['onMouseMove'];
  changeCurrentDate: ReturnType<typeof usePlanDrag>['changeCurrentDate'];
};

const TimetableColumns: React.FC<TProps> = ({
  dateMoments,
  timePlans,
  onMouseMove,
  changeCurrentDate,
}) => {
  const columnPlans = getColumnPlans(dateMoments, timePlans);

  return (
    <TimetableScroll.Vertical>
      <TimetableScroll.Horizontal
        scrollId="view"
        fixedComponent={<TimetableTimeline />}
      >
        <Container>
          {dateMoments.map((dateMoment, i) => {
            const plans = columnPlans[i];

            return (
              <TimePlanColumn
                key={dateMoment.toString()}
                onMouseMove={onMouseMove}
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
      </TimetableScroll.Horizontal>
    </TimetableScroll.Vertical>
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
