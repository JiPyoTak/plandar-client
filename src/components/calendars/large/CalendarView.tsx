import React, { useCallback, useMemo } from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import CalendarLayer from './CalendarLayer';
import CalendarOverlay from './CalendarOverlay';
import CalendarWeek from './CalendarWeek';
import useClassifiedPlans from '@/hooks/useClassifiedPlans';
import usePlanDrag from '@/hooks/usePlanDrag';
import useDateState from '@/stores/date';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { getCalendarInfo } from '@/utils/calendar/getCalendarInfo';
import { getDaysPlanManager } from '@/utils/plan/getDaysPlanManager';

const CalendarView = () => {
  const { year, month, day } = useDateState();
  const { focusedPlan, isDragging, createDragPlan } = useFocusedPlanState();
  const { onMouseMove, changeCurrentDate } = usePlanDrag();

  const calendarInfos = useMemo(
    () => getCalendarInfo({ year, month, day }),
    [year, month, day],
  );

  const data = useClassifiedPlans();

  const planManagers = useMemo(() => {
    const plans = (data ?? []).filter((plan) => plan.id !== focusedPlan?.id);
    if (focusedPlan) plans.push(focusedPlan);

    return getDaysPlanManager(plans, calendarInfos);
  }, [data, focusedPlan, calendarInfos]);

  const onMouseDownCell: React.MouseEventHandler = useCallback((e) => {
    const targetDate = (
      (e.target as HTMLElement).closest('.date-time') as HTMLElement
    )?.dataset?.date;

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
      {calendarInfos.map((week, i) => (
        <Inner key={`${week[i].day}${i}`}>
          <CalendarWeek
            index={i}
            week={week}
            daysIndex={planManagers[i].daysIndex}
            daysTimePlans={planManagers[i].daysTimePlans}
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

  overflow-y: auto;
`;

const Inner = styled.div`
  position: relative;

  flex: 1;
  display: flex;
`;

export default CalendarView;
