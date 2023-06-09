import React, { useCallback, useMemo } from 'react';

import styled from '@emotion/styled';

import CalendarLayer from './CalendarLayer';
import CalendarOverlay from './CalendarOverlay';
import CalendarWeek from './CalendarWeek';
import { useGetPlansQuery } from '@/hooks/rq/plan';
import usePlanDrag from '@/hooks/usePlanDrag';
import useDateState from '@/stores/date';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { getCalendarInfo } from '@/utils/calendar/getCalendarInfo';
import { getFormattedDate } from '@/utils/date/getFormattedDate';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';
import { getDaysPlanManager } from '@/utils/plan/getDaysPlanManager';

const CalendarView = () => {
  const { year, month, day } = useDateState();
  const { focusedPlan, isDragging, createDragPlan } = useFocusedPlanState();
  const { currentDateRef, onMouseMove, changeCurrentDate } = usePlanDrag();

  const calendarInfos = useMemo(
    () => getCalendarInfo({ year, month, day }),
    [year, month, day],
  );

  const { startFormat, endFormat } = getFormattedDate(
    ...getStartAndEndDate({ year, month, day }),
  );

  const { data } = useGetPlansQuery({
    timemin: startFormat,
    timemax: endFormat,
  });

  const planManagers = useMemo(
    () =>
      getDaysPlanManager(
        [
          ...(data ?? []).filter((plan) => plan.id !== focusedPlan?.id),
          ...(focusedPlan ? [focusedPlan] : []),
        ],
        calendarInfos,
      ),
    [data, focusedPlan, calendarInfos],
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
