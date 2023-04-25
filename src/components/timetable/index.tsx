import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import TimetableAllDay from '@/components/timetable/TimetableAllDay';
import TimetableHeader from '@/components/timetable/TimetableHeader';
import TimetableView from '@/components/timetable/view';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';
import { MONTH_PLANS_MOCK } from '@/utils/mock';
import divideDayPlans from '@/utils/plan/day/divideDayPlans';

type TProps = {
  rangeAmount?: number;
};

const Timetable: React.FC<TProps> = ({ rangeAmount = 1 }) => {
  const { selectedCalendarUnit } = useCalendarUnitState();
  const { year, month, day } = useDateState();

  // 주 선택하면 선택한 날짜 상관없이 해당 주를 보여주기
  const startMoment = moment({ year, month: month - 1, day });
  if (selectedCalendarUnit === '주') {
    rangeAmount = 7;
    startMoment.startOf('week');
  }

  // 범위에 해당하는 일자의 Moment들 생성
  const range = Math.min(rangeAmount, 7);
  const dateMoments = Array.from(Array(range), (_, index) =>
    startMoment.clone().add(index, 'days'),
  );
  const showHeader = range > 1;

  // TODO : React-Query를 이용해 Plans 가져오기
  const plans = MONTH_PLANS_MOCK[month];

  // 종일, 시간에 들어가야 할 일정 분류하기
  const { timePlans, allDayPlans } = divideDayPlans(plans);

  return (
    <Container>
      {showHeader && <TimetableHeader dateMoments={dateMoments} />}
      <TimetableAllDay dateMoments={dateMoments} allDayPlans={allDayPlans} />
      <TimetableView dateMoments={dateMoments} timePlans={timePlans} />
    </Container>
  );
};

const Container = styled.div`
  ${TIMETABLE_SCROLL_STYLE}
  width: 100%;
  height: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;

  user-select: none;
`;

export default Timetable;
