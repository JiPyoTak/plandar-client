import React from 'react';

import styled from '@emotion/styled';
import { Moment } from 'moment';

import CalendarLayer from '@/components/calendars/large/CalendarLayer';

import TimetableScroller from '@/components/timetable/TimetableScroller';

import DaysPlanManager from '@/plan/DaysPlanManager';
import Plan from '@/plan/Plan';
import {
  TIMETABLE_ALLDAY_PLAN_HEIGHT,
  TIMETABLE_ALLDAY_VERTICAL_PADDING,
  TIMETABLE_CELL_MIN_WIDTH,
} from '@/styles/timetable';
import { getYMDByDateFormat } from '@/utils/date/getYMDByDateFormat';

type TProps = {
  dateMoments: Moment[];
  allDayPlans: Plan[];
};

const getAllDayHeight = (itemLength: number) => {
  return (
    itemLength * TIMETABLE_ALLDAY_PLAN_HEIGHT +
    TIMETABLE_ALLDAY_VERTICAL_PADDING * 2
  );
};

const TimetableAllDay: React.FC<TProps> = ({ dateMoments, allDayPlans }) => {
  const [start, end] = getYMDByDateFormat(
    dateMoments[0].toString(),
    dateMoments[dateMoments.length - 1].toString(),
  );
  const planManager = new DaysPlanManager({ plans: allDayPlans, start, end });
  const itemMaxLength = planManager.daysIndex.reduce(
    (acc, arr) => Math.max(acc, arr.length),
    0,
  );

  return (
    <TimetableVerticalScroller>
      <TimetableScroller.Horizontal
        scrollId="allDay"
        fixedComponent={
          <GuideSizer>
            <GuidePositioner>
              <GuideText>종일</GuideText>
            </GuidePositioner>
          </GuideSizer>
        }
      >
        <div css={{ flex: 1 }}>
          <AllDayPlanPositioner>
            <CalendarLayer
              css={{ top: TIMETABLE_ALLDAY_VERTICAL_PADDING }}
              planManager={planManager}
            />
          </AllDayPlanPositioner>
          <AllDayCellList css={{ height: getAllDayHeight(itemMaxLength) }}>
            {dateMoments.map((_, index) => {
              return <AllDayCell key={index} />;
            })}
          </AllDayCellList>
        </div>
      </TimetableScroller.Horizontal>
    </TimetableVerticalScroller>
  );
};

const ALLDAY_MAX_HEIGHT = getAllDayHeight(8);

const TimetableVerticalScroller = styled(TimetableScroller.Vertical)`
  flex: 0 0 auto;
  max-height: ${ALLDAY_MAX_HEIGHT}px;
`;

const GuideSizer = styled.div`
  width: 100%;
  height: 100%;

  border-right: 1px solid ${({ theme }) => theme.border2};
`;

const GuidePositioner = styled.div`
  height: 100%;
  max-height: ${ALLDAY_MAX_HEIGHT}px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-right: none;
`;

const GuideText = styled.span`
  padding: 0.25rem 0.25rem 0.25rem 0;

  position: absolute;
`;

const AllDayPlanPositioner = styled.div`
  width: 100%;

  position: relative;
  display: flex;
`;

const AllDayCellList = styled.div`
  width: 100%;
  min-height: 1.75rem;

  display: flex;
`;

const AllDayCell = styled.div`
  flex: 1 0 auto;

  min-width: ${TIMETABLE_CELL_MIN_WIDTH};
  border-right: 1px solid ${({ theme }) => theme.border2};
`;

export default TimetableAllDay;
