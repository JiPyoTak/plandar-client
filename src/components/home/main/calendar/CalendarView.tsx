import React, { useCallback, useMemo } from 'react';

import styled from '@emotion/styled';

import moment, { Moment } from 'moment';

import CalendarLayer from './CalendarLayer';
import CalendarOverlay from './CalendarOverlay';
import CalendarWeek from './CalendarWeek';
import useClassifiedPlans from '@/hooks/useClassifiedPlans';
import usePlanDrag from '@/hooks/usePlanDrag';
import useDateState from '@/stores/date';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { getDayMoments } from '@/utils/calendar/getDayMoments';
import { getDaysPlanManager } from '@/utils/plan/getDaysPlanManager';

const CalendarView = () => {
  const referenceDate = useDateState(({ referenceDate }) => referenceDate);
  const { focusedPlan, isDragging, createDragPlan } = useFocusedPlanState();
  const { onMouseMove, changeCurrentDate } = usePlanDrag();

  const calendarInfos = useMemo(() => {
    // TODO: utils
    /// 7일 단위로 끊어서 2단 배열로 만들어준다.
    let weekMoments: Moment[] = [];
    return getDayMoments(referenceDate).reduce((result, dayMoment) => {
      weekMoments.push(dayMoment);
      if (weekMoments.length === 7) {
        result.push(weekMoments);
        weekMoments = [];
      }
      return result;
    }, [] as Moment[][]);
  }, [referenceDate]);

  const data = useClassifiedPlans();

  const planManagers = useMemo(() => {
    const plans = (data ?? []).filter((plan) => plan.id !== focusedPlan?.id);
    if (focusedPlan) plans.push(focusedPlan);

    return getDaysPlanManager(plans, calendarInfos);
  }, [data, focusedPlan, calendarInfos]);

  const onMouseDownCell: React.MouseEventHandler = useCallback((e) => {
    const target = e.target as HTMLElement;

    if (target.closest('.time-plan')) return;

    const targetDate = (target.closest('.date-time') as HTMLElement)?.dataset
      ?.date;

    if (!targetDate) return;

    const dateFormat = moment(targetDate);

    createDragPlan({
      startTime: dateFormat.toDate().toUTCString(),
      endTime: dateFormat.endOf('day').toDate().toUTCString(),
    });
  }, []);

  return (
    <Container
      className={isDragging ? 'isDragging' : ''}
      onMouseMove={onMouseMove}
      onMouseDown={changeCurrentDate}
    >
      {calendarInfos.map((dayMoments, i) => (
        <Inner key={`${dayMoments[i].day()}${i}`}>
          <CalendarWeek
            dayMoments={dayMoments}
            daysIndex={planManagers[i].daysIndex}
            daysTimePlans={planManagers[i].daysTimePlans}
            onMouseDown={onMouseDownCell}
          />
          {planManagers[i].plans.length !== 0 && (
            <CalendarLayer planManager={planManagers[i]} />
          )}
          <CalendarOverlay dayMoments={dayMoments} />
        </Inner>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  flex: 1;

  display: flex;
  flex-flow: column;
  align-items: stretch;

  &.isDragging,
  &.isDragging * {
    cursor: grabbing !important;
  }

  overflow-y: auto;
`;

const Inner = styled.div`
  position: relative;

  flex: 1;
  display: flex;
`;

export default CalendarView;
