import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableCellColumn from './TimetableCellColumn';
import TimetablePlanColumn from './TimetablePlanColumn';
import TimetableSelect from './TimetableSelect';
import usePlanDrag from '@/hooks/usePlanDrag';
import { TimetableViewMomentProvider } from '@/hooks/useTimetableViewMoment';
import Plan from '@/plan/Plan';
import { TIMETABLE_CELL_MIN_WIDTH } from '@/styles/timetable';
import getColumnPlans from '@/utils/plan/getColumnPlans';

type TProps = {
  dateMoments: Moment[];
  timePlans: Plan[];
};

const TimetableView: React.FC<TProps> = ({ dateMoments, timePlans }) => {
  const { currentDateRef, onMouseMove, changeCurrentDate } = usePlanDrag();

  const columnPlans = getColumnPlans(dateMoments, timePlans);

  return (
    <>
      {dateMoments.map((dateMoment, i) => {
        const plans = columnPlans[i];

        return (
          <Column
            key={dateMoment.toString()}
            onMouseMove={currentDateRef.current ? onMouseMove : undefined}
            onMouseDown={changeCurrentDate}
          >
            <TimetableViewMomentProvider value={dateMoment}>
              <TimetablePlanColumn plans={plans} />
              <TimetableSelect />
              <TimetableCellColumn />
            </TimetableViewMomentProvider>
          </Column>
        );
      })}
    </>
  );
};

const Column = styled.div`
  flex: 1 0 0;
  min-width: ${TIMETABLE_CELL_MIN_WIDTH};

  border-left: 1px solid ${({ theme }) => theme.border2};
`;

export default TimetableView;
