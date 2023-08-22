import React, { useCallback, useMemo } from 'react';

import styled from '@emotion/styled';
import moment, { Moment } from 'moment';

import CalendarLayer from '@/components/home/main/calendar/CalendarLayer';

import TimetableScroll from '@/components/home/main/timetable/TimetableScroll';

import DaysPlanManager from '@/core/plan/DaysPlanManager';
import Plan from '@/core/plan/Plan';
import usePlanDrag from '@/hooks/usePlanDrag';
import usePlanPreviewEvent from '@/hooks/usePlanPreviewEvent';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import {
  TIMETABLE_ALL_DAY_PLAN_HEIGHT,
  TIMETABLE_ALL_DAY_VERTICAL_PADDING,
  TIMETABLE_CELL_MIN_WIDTH,
} from '@/styles/timetable';

type TProps = {
  dateMoments: Moment[];
  allDayPlans: Plan[];
  onMouseMove: ReturnType<typeof usePlanDrag>['onMouseMove'];
  changeCurrentDate: ReturnType<typeof usePlanDrag>['changeCurrentDate'];
};

const getAllDayHeight = (itemLength: number) => {
  return (
    itemLength * TIMETABLE_ALL_DAY_PLAN_HEIGHT +
    TIMETABLE_ALL_DAY_VERTICAL_PADDING * 2
  );
};

const TimetableAllDay: React.FC<TProps> = ({
  dateMoments,
  allDayPlans,
  onMouseMove,
  changeCurrentDate,
}) => {
  const previewPlan = usePlanPreviewEvent();
  const focusedPlan = useFocusedPlanState((state) => state.focusedPlan);
  const createDragPlan = useFocusedPlanState((state) => state.createDragPlan);

  const planManager = useMemo(
    () =>
      new DaysPlanManager({
        plans: [
          ...allDayPlans.filter((plan) => plan.id !== focusedPlan?.id),
          ...(focusedPlan ? [focusedPlan] : []),
        ],
        start: dateMoments[0],
        end: dateMoments[dateMoments.length - 1],
      }),
    [allDayPlans, focusedPlan, dateMoments],
  );
  const itemMaxLength = planManager.daysIndex.reduce(
    (acc, arr) => Math.max(acc, arr.length),
    0,
  );

  const onMouseDownCell: React.MouseEventHandler = useCallback(
    (e) => {
      const targetDate = (
        (e.target as HTMLElement).closest('.date-time') as HTMLElement
      )?.dataset?.date;

      if (!targetDate) return;

      const dateFormat = moment(targetDate);

      createDragPlan({
        startTime: dateFormat.toDate().toUTCString(),
        endTime: dateFormat.endOf('day').toDate().toUTCString(),
      });
    },
    [createDragPlan],
  );

  return (
    <TimetableVerticalScroll>
      <TimetableScroll.Horizontal
        scrollId="allDay"
        fixedComponent={
          <GuideSizer>
            <GuidePositioner>
              <GuideText>종일</GuideText>
            </GuidePositioner>
          </GuideSizer>
        }
      >
        <div
          css={{ flex: 1 }}
          onMouseMove={onMouseMove}
          onMouseDown={changeCurrentDate}
        >
          <AllDayPlanPositioner
            css={{
              minWidth: `calc(${TIMETABLE_CELL_MIN_WIDTH} * ${dateMoments.length})`,
            }}
          >
            <CalendarLayer
              css={{ top: TIMETABLE_ALL_DAY_VERTICAL_PADDING }}
              planManager={planManager}
              previewPlan={previewPlan}
            />
          </AllDayPlanPositioner>
          <AllDayCellList css={{ height: getAllDayHeight(itemMaxLength) }}>
            {dateMoments.map((dateMoment, index) => {
              return (
                <AllDayCell
                  key={index}
                  className="date-time"
                  onMouseDown={onMouseDownCell}
                  data-date={dateMoment.format('YYYY-MM-DD')}
                />
              );
            })}
          </AllDayCellList>
        </div>
      </TimetableScroll.Horizontal>
    </TimetableVerticalScroll>
  );
};

const ALLDAY_MAX_HEIGHT = getAllDayHeight(8);

const TimetableVerticalScroll = styled(TimetableScroll.Vertical)`
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
