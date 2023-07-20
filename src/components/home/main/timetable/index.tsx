import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import TimetableScroll from './TimetableScroll';
import TimetableView from './view';
import TimetableHeader from '@/components/home/main/timetable/TimetableHeader';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import {
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_SCROLL_WIDTH,
} from '@/styles/timetable';

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

  return (
    <Container>
      <TimetableScroll>
        {showHeader && <TimetableHeader dateMoments={dateMoments} />}
        <TimetableView dateMoments={dateMoments} />
        <VerticalScrollController cellLength={dateMoments.length} />
      </TimetableScroll>
    </Container>
  );
};

const VerticalScrollController = ({ cellLength }: { cellLength: number }) => {
  const selectedPlanId = useSelectedPlanState(
    (state) => state.selectedPlan?.id,
    (prev, next) => prev === next,
  );
  const showScroll = !selectedPlanId;

  return (
    <TimetableScroll.Horizontal
      css={{ marginRight: TIMETABLE_SCROLL_WIDTH }}
      showScroll={showScroll}
    >
      <VerticalEmptyCell cellLength={cellLength} />
    </TimetableScroll.Horizontal>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;

  display: flex;
  flex-direction: column;

  user-select: none;
`;

const VerticalEmptyCell = styled.div<{ cellLength: number }>`
  width: calc(${TIMETABLE_CELL_MIN_WIDTH} * ${({ cellLength }) => cellLength});
  height: 1px;
  display: flex;
`;

export default Timetable;