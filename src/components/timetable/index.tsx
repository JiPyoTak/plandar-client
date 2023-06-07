import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import { default as HorizontalScroller } from './TimetableHorizontalScroller';
import TimetableTimeline from './TimetableTimeline';
import TimetableAllDay from '@/components/timetable/TimetableAllDay';
import TimetableHeader from '@/components/timetable/TimetableHeader';
import TimetableView from '@/components/timetable/view';
import { MONTH_PLANS_MOCK } from '@/constants/mock';
import useTimetableScroll from '@/hooks/useTimetableScroll';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import {
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_SCROLL_STYLE,
} from '@/styles/timetable';
import { divideTimePlans } from '@/utils/plan/divideTimePlans';

type TProps = {
  rangeAmount?: number;
};

const Timetable: React.FC<TProps> = ({ rangeAmount = 1 }) => {
  const { selectedCalendarUnit } = useCalendarUnitState();
  const { year, month, day } = useDateState();
  const { onMoveHorizontalScroll, ...scrollerController } =
    useTimetableScroll();

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
  const { timePlans, allDayPlans } = divideTimePlans(plans);

  const timezone = `GTM${dateMoments[0].format('Z')}`;

  return (
    <Container>
      {showHeader && (
        <HorizontalScroller
          fixedComponent={<HeaderGuide>{timezone}</HeaderGuide>}
          scrollId="header"
          scrollerController={scrollerController}
        >
          <TimetableHeader dateMoments={dateMoments} />
        </HorizontalScroller>
      )}
      <HorizontalScroller
        fixedComponent={<AllDayGuide>종일</AllDayGuide>}
        scrollId="allday"
        scrollerController={scrollerController}
      >
        <TimetableAllDay dateMoments={dateMoments} allDayPlans={allDayPlans} />
      </HorizontalScroller>
      <VerticalScroller>
        <HorizontalScroller
          fixedComponent={<TimetableTimeline />}
          scrollId="view"
          scrollerController={scrollerController}
        >
          <TimetableView dateMoments={dateMoments} timePlans={timePlans} />
        </HorizontalScroller>
      </VerticalScroller>
      <HorizontalScroller
        css={{ border: 'none' }}
        showScroll={true}
        onScroll={onMoveHorizontalScroll}
      >
        <VerticalScrollBar cellLength={dateMoments.length} />
      </HorizontalScroller>
    </Container>
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

const GuideDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.25rem;

  display: flex;
  justify-content: flex-end;
`;

const HeaderGuide = styled(GuideDiv)`
  align-items: flex-end;
`;

const AllDayGuide = styled(GuideDiv)`
  align-items: center;
`;

const VerticalScroller = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  flex: 1 0 0;
  min-width: 100%;

  overflow-x: hidden;
  overflow-y: auto;
`;

const VerticalScrollBar = styled.div<{ cellLength: number }>`
  width: calc(${TIMETABLE_CELL_MIN_WIDTH} * ${({ cellLength }) => cellLength});
  height: 1px;
  display: flex;
`;

export default Timetable;
