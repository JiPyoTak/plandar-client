import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableCellColumn from './TimetableCellColumn';
import TimetablePlanColumn from './TimetablePlanColumn';
import TimetableSelect from './TimetableSelect';
import TimetableTimeline from './TimetableTimeline';
import usePlanDrag from '@/hooks/usePlanDrag';
import { TimetableViewMomentProvider } from '@/hooks/useTimetableViewMoment';
import Plan from '@/plan/Plan';
import {
  TIMETABLE_SCROLL_STYLE,
  TIMETABLE_CELL_MIN_WIDTH,
} from '@/styles/timetable';
import getColumnPlans from '@/utils/plan/getColumnPlans';

type TProps = {
  dateMoments: Moment[];
  timePlans: Plan[];
};

const DATE_FORMAT = 'YYYY-MM-DD';

const TimetableView: React.FC<TProps> = ({ dateMoments, timePlans }) => {
  const { currentDateRef, onMouseMove, changeCurrentDate } = usePlanDrag();

  const columnPlans = getColumnPlans(dateMoments, timePlans);

  return (
    <Scroller>
      <Container>
        <TimetableTimeline />
        {dateMoments.map((dateMoment, i) => {
          const formattedDate = dateMoment.format(DATE_FORMAT);
          const plans = columnPlans[i];

          return (
            <Column
              key={formattedDate}
              onMouseMove={currentDateRef.current ? onMouseMove : undefined}
              onMouseDown={changeCurrentDate}
            >
              <TimetableViewMomentProvider value={dateMoment}>
                <TimetablePlanColumn plans={plans} />
                <TimetableSelect />
                <TimetableCellColumn formattedDate={formattedDate} />
              </TimetableViewMomentProvider>
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
