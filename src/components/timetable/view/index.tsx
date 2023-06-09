import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import TimetableColumns from './columns';
import TimetableAllDay from './TimetableAllDay';
import { MONTH_PLANS_MOCK } from '@/constants/mock';
import useDateState from '@/stores/date';
import { divideTimePlans } from '@/utils/plan/divideTimePlans';

type TProps = {
  dateMoments: Moment[];
};

const TimetableView: React.FC<TProps> = ({ dateMoments }) => {
  // TODO : React-Query를 이용해 Plans 가져오기
  const { month } = useDateState();
  const plans = MONTH_PLANS_MOCK[month];

  // 종일, 시간에 들어가야 할 일정 분류하기
  const { timePlans, allDayPlans } = divideTimePlans(plans);

  return (
    <>
      <TimetableHr />
      <TimetableAllDay dateMoments={dateMoments} allDayPlans={allDayPlans} />
      <TimetableHr />
      <TimetableColumns dateMoments={dateMoments} timePlans={timePlans} />
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
