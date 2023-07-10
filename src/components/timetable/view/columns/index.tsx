import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableCellColumn from './TimetableCellColumn';
import TimetablePlanColumn from './TimetablePlanColumn';
import TimetableSelected from './TimetableSelected';
import TimetableTimeline from './TimetableTimeline';
import TimetableScroller from '@/components/timetable/TimetableScroller';
import usePlanDrag from '@/hooks/usePlanDrag';
import { TimetableViewMomentProvider } from '@/hooks/useTimetableViewMoment';
import Plan from '@/plan/Plan';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
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
  const selectedPlanId = useSelectedPlanState(
    (state) => state.selectedPlan?.id,
    (prev, next) => prev === next,
  );

  return (
    <TimetableScroller.Vertical
      css={{ overflow: selectedPlanId ? 'hidden' : 'auto' }}
    >
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
