import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableColumns from './columns';
import TimetableAllDay from './TimetableAllDay';
import { useGetPlansQuery } from '@/hooks/rq/plan';
import usePlanDrag from '@/hooks/usePlanDrag';
import useDateState from '@/stores/date';
import { getFormattedDate } from '@/utils/date/getFormattedDate';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';
import { divideTimePlans } from '@/utils/plan/divideTimePlans';

type TProps = {
  dateMoments: Moment[];
};

const TimetableView: React.FC<TProps> = ({ dateMoments }) => {
  const { onMouseMove, changeCurrentDate } = usePlanDrag();

  const { year, month, day } = useDateState();
  const { startFormat, endFormat } = getFormattedDate(
    ...getStartAndEndDate({ year, month, day }),
  );
  const { data: plans } = useGetPlansQuery({
    timemin: startFormat,
    timemax: endFormat,
  });

  // 종일, 시간에 들어가야 할 일정 분류하기
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
