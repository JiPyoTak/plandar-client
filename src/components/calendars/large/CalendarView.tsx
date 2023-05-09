import React, { useCallback, useMemo } from 'react';

import styled from '@emotion/styled';

import CalendarLayer from './CalendarLayer';
import CalendarOverlay from './CalendarOverlay';
import CalendarWeek from './CalendarWeek';
import usePlanDrag from '@/hooks/usePlanDrag';
import Plan from '@/plan/Plan';
import useDateState from '@/stores/date';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { getCalendarInfo } from '@/utils/calendar/getCalendarInfo';
import { dummy } from '@/utils/plan/dummy';
import { getDaysPlanManager } from '@/utils/plan/getDaysPlanManager';

const CalendarView = () => {
  const { year, month, day } = useDateState();
  const { focusedPlan, isDragging, createDragPlan } = useFocusedPlanState();
  const { currentDateRef, onMouseMove, changeCurrentDate } = usePlanDrag();

  const calendarInfos = useMemo(
    () => getCalendarInfo({ year, month, day }),
    [year, month, day],
  );

  const planManagers = useMemo(
    () => getDaysPlanManager(dummy, calendarInfos),
    [dummy, calendarInfos],
  );

  const focusedPlanArgs = focusedPlan ? [new Plan(focusedPlan)] : [];

  const focusedPlanManager = useMemo(
    () => getDaysPlanManager(focusedPlanArgs, calendarInfos),
    [focusedPlanArgs, calendarInfos],
  );

  const onMouseDownCell: React.MouseEventHandler = useCallback((e) => {
    const targetDate = (
      (e.target as HTMLElement).closest('.dateTime') as HTMLElement
    )?.dataset?.date;

    if (!targetDate) return;

    createDragPlan({
      startTime: targetDate,
      endTime: targetDate,
    });
  }, []);

  return (
    <Container
      className={isDragging ? 'isDragging' : ''}
      onMouseMove={currentDateRef.current ? onMouseMove : undefined}
      onMouseDown={changeCurrentDate}
    >
      {calendarInfos.map((week, i) => (
        <Inner key={`${week[i].day}${i}`}>
          <CalendarWeek
            index={i}
            week={week}
            daysIndex={planManagers[i].daysIndex}
            onMouseDown={onMouseDownCell}
          />
          {planManagers[i].plans.length !== 0 && (
            <CalendarLayer planManager={planManagers[i]} />
          )}
          {focusedPlan && isDragging && (
            <CalendarLayer planManager={focusedPlanManager[i]} />
          )}
          <CalendarOverlay week={week} />
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
`;

const Inner = styled.div`
  position: relative;

  flex: 1;
  display: flex;
`;

export default CalendarView;
