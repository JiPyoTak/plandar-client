import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import TimetableScroller from './TimetableScroller';
import TimetableTimeline from './TimetableTimeline';
import TimetableAllDay from '@/components/timetable/TimetableAllDay';
import TimetableHeader from '@/components/timetable/TimetableHeader';
import TimetableView from '@/components/timetable/view';
import { MONTH_PLANS_MOCK } from '@/constants/mock';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import {
  TIMETABLE_ALLDAY_PLAN_HEIGHT,
  TIMETABLE_ALLDAY_VERTICAL_PADDING,
  TIMETABLE_CELL_MIN_WIDTH,
  TIMETABLE_SCROLL_WIDTH,
} from '@/styles/timetable';
import { divideTimePlans } from '@/utils/plan/divideTimePlans';

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
  const { timePlans, allDayPlans } = divideTimePlans(plans);

  const timezone = `GTM${dateMoments[0].format('Z')}`;

  const allDayMaxHeight =
    TIMETABLE_ALLDAY_PLAN_HEIGHT * 8 + TIMETABLE_ALLDAY_VERTICAL_PADDING * 2;

  return (
    <Container>
      <TimetableScroller>
        {showHeader && (
          <TimetableScroller.HorizontalScroller
            scrollId="header"
            fixedComponent={<HeaderGuide>{timezone}</HeaderGuide>}
          >
            <TimetableHeader dateMoments={dateMoments} />
          </TimetableScroller.HorizontalScroller>
        )}
        <Seperater />
        <TimetableScroller.VerticalScroller
          css={{
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: 'auto',
            maxHeight: allDayMaxHeight,
          }}
        >
          <TimetableScroller.HorizontalScroller
            scrollId="allday"
            fixedComponent={<AllDayGuide>종일</AllDayGuide>}
          >
            <TimetableAllDay
              dateMoments={dateMoments}
              allDayPlans={allDayPlans}
            />
          </TimetableScroller.HorizontalScroller>
        </TimetableScroller.VerticalScroller>
        <Seperater />
        <TimetableScroller.VerticalScroller>
          <TimetableScroller.HorizontalScroller
            scrollId="view"
            fixedComponent={<TimetableTimeline />}
          >
            <TimetableView dateMoments={dateMoments} timePlans={timePlans} />
          </TimetableScroller.HorizontalScroller>
        </TimetableScroller.VerticalScroller>
        <Seperater />
        <TimetableScroller.HorizontalScroller
          css={{ marginRight: TIMETABLE_SCROLL_WIDTH }}
          showScroll={true}
        >
          <VerticalEmptyCell cellLength={dateMoments.length} />
        </TimetableScroller.HorizontalScroller>
      </TimetableScroller>
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

  display: flex;
  justify-content: flex-end;
`;

const HeaderGuide = styled(GuideDiv)`
  padding: 0.25rem 0.25rem 0.25rem 0;

  align-items: flex-end;
  border-right: 1px solid ${({ theme }) => theme.border2};
`;

const AllDayGuide = styled(GuideDiv)`
  padding: 0.25rem;

  align-items: center;

  border-right: 1px solid ${({ theme }) => theme.border2};
`;

const Seperater = styled.div`
  flex: 0 0 1px;
  width: 100%;
  height: 0;
  border-bottom: 1px solid ${({ theme }) => theme.border2};
`;

const VerticalEmptyCell = styled.div<{ cellLength: number }>`
  width: calc(${TIMETABLE_CELL_MIN_WIDTH} * ${({ cellLength }) => cellLength});
  height: 1px;
  display: flex;
`;

export default Timetable;
