import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableColumns from './columns';
import TimetableAllDay from './TimetableAllDay';
import usePlanDrag from '@/hooks/usePlanDrag';
import useDateState from '@/stores/date';
import { getPlanStubs } from '@/stories/apis/data/plan';
import { getFormattedDate } from '@/utils/date/getFormattedDate';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';
import { divideTimePlans } from '@/utils/plan/divideTimePlans';

type TProps = {
  dateMoments: Moment[];
};

const TimetableView: React.FC<TProps> = ({ dateMoments }) => {
  const { onMouseMove, changeCurrentDate } = usePlanDrag();

  // TODO : React-Query를 이용해 Plans 가져오기
  const { year, month, day } = useDateState();
  const { startFormat, endFormat } = getFormattedDate(
    ...getStartAndEndDate({ year, month, day }),
  );

  const plans = getPlanStubs({ timeMin: startFormat, timeMax: endFormat });

  // 종일, 시간에 들어가야 할 일정 분류하기
  const { timePlans, allDayPlans } = divideTimePlans(plans);

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
