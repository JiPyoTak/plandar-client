import React from 'react';

import styled from '@emotion/styled';

import TimetableScroll from './TimetableScroll';
import TimetableView from './view';
import TimetableHeader from '@/components/home/main/timetable/TimetableHeader';
import useDateState from '@/stores/date';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import {
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_SCROLL_WIDTH,
} from '@/styles/timetable';

const Timetable: React.FC = () => {
  const referenceDateRange = useDateState(
    ({ referenceDateRange }) => referenceDateRange,
  );

  // 범위에 해당하는 일자의 Moment들 생성
  const { startMoment, endMoment } = referenceDateRange;
  const range = Math.max(
    endMoment.clone().add(1, 'ms').diff(startMoment, 'day'),
    1,
  );
  const dateMoments = Array.from(Array(range), (_, index) =>
    startMoment.clone().add(index, 'day'),
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
      scrollId="controller"
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
