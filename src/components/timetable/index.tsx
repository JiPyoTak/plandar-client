import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import TimetableAllDay from '@/components/timetable/TimetableAllDay';
import TimetableHeader from '@/components/timetable/TimetableHeader';
import TimetableView from '@/components/timetable/view';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

type TProps = {
  rangeAmount?: number;
};

const Timetable: React.FC<TProps> = ({ rangeAmount = 1 }) => {
  const { selectedCalendarUnit } = useCalendarUnitState();
  const { year, month, day } = useDateState();

  // 주 선택하면 선택한 날짜 상관없이 해당 주를 보여주기 위함
  const startMoment = moment({ year, month: month - 1, day });
  if (selectedCalendarUnit === '주') {
    rangeAmount = 7;
    startMoment.startOf('week');
  }

  // 일정 범위에 따라 일자마다 Moment 생성
  const range = Math.min(rangeAmount, 7);
  const dateMoments = Array.from(Array(range), (_, index) =>
    startMoment.clone().add(index, 'days'),
  );
  const showHeader = range > 1;

  const plans: any[] = [];
  const [dayPlans, allDayPlans] = plans.reduce(
    ([days, allDays], plan) => {
      const { isAllDay, startTime, endTime } = plan;
      const isSameDay =
        new Date(startTime).toDateString() ===
        new Date(endTime ?? -1).toDateString();

      isAllDay || !isSameDay ? allDays.push(plan) : days.push(plan);
      return [days, allDays];
    },
    [[], []] as (typeof plans)[],
  );

  return (
    <Container>
      {showHeader && <TimetableHeader dateMoments={dateMoments} />}
      <TimetableAllDay dateMoments={dateMoments} allDayPlans={allDayPlans} />
      <TimetableView dateMoments={dateMoments} dayPlans={dayPlans} />
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
`;

export default Timetable;
