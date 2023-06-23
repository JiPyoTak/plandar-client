import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableColumns from './columns';
import TimetableAllDay from './TimetableAllDay';
import useClassifiedPlans from '@/hooks/useClassifiedPlans';
import usePlanDrag from '@/hooks/usePlanDrag';
import { divideTimePlans } from '@/utils/plan/divideTimePlans';

type TProps = {
  dateMoments: Moment[];
};

const TimetableView: React.FC<TProps> = ({ dateMoments }) => {
  const { onMouseMove, changeCurrentDate } = usePlanDrag();

  const plans = useClassifiedPlans();
  const { timePlans, allDayPlans } = divideTimePlans(plans ?? []);

  return (
    <>
      <TimetableHr />
      <TimetableAllDay
        dateMoments={dateMoments}
        allDayPlans={allDayPlans}
        onMouseMove={onMouseMove}
        changeCurrentDate={changeCurrentDate}
      />
      <TimetableHr />
      <TimetableColumns
        dateMoments={dateMoments}
        timePlans={timePlans}
        onMouseMove={onMouseMove}
        changeCurrentDate={changeCurrentDate}
      />
      <TimetableHr />
    </>
  );
};

const TimetableHr = styled.hr`
  flex: 0;
  width: 100%;
  margin: 0;

  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.border2};
`;

export default TimetableView;
