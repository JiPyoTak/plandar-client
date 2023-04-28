import React from 'react';

import styled from '@emotion/styled';

import CalendarCell from './CalendarCell';
import CalendarLayer from './CalendarLayer';
import usePlanDrag, { MouseEventHandler } from '@/hooks/usePlanDrag';
import useDateState from '@/stores/date';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { getStartAndEndDateInMonth } from '@/utils/dayHandler';
import { getCalendarInfo } from '@/utils/getCalendarInfo';
import { getCalendarPlans } from '@/utils/getCalendarPlans';
import { dummy } from '@/utils/plan/dummy';

const CalendarView = () => {
  const { focusedPlan, selectPlan, isDragging } = useFocusedPlanState();
  const { onChangeStoreDate, year, month, day } = useDateState();
  const { changeCurrentDate, currentDateRef, onMouseMove } = usePlanDrag();

  const calendarInfos = getCalendarInfo({ year, month, day });
  const dates = getStartAndEndDateInMonth(calendarInfos);
  const selectedPlanArgs = focusedPlan ? [focusedPlan] : [];

  const calendarPlanViews = getCalendarPlans(dummy, ...dates);
  const selectedPlanViews = getCalendarPlans(selectedPlanArgs, ...dates);

  const onMouseDownCell: MouseEventHandler = (e) => {
    const targetDate = (
      (e.target as HTMLElement).closest('.dateTime') as HTMLElement
    )?.dataset?.date;

    if (!targetDate) return;

    const newPlan = {
      id: -1,
      startTime: targetDate,
      endTime: targetDate,
    };

    selectPlan(newPlan);
  };

  return (
    <Container
      className={isDragging ? 'isDragging' : ''}
      onMouseMove={currentDateRef.current ? onMouseMove : undefined}
      onMouseDown={changeCurrentDate}
    >
      {calendarInfos.map((week, i) => (
        <Inner key={`${week[i].day}${i}`}>
          <Inner>
            {week.map((dateInfo, j) => (
              <CalendarCell
                key={`${dateInfo.month}${dateInfo.day}`}
                height={calendarPlanViews[i][j].length * 24}
                isLastWeek={i === calendarInfos.length - 1}
                isLastDay={dateInfo.day === week[week.length - 1].day}
                dateInfo={dateInfo}
                format={dateInfo.format}
                isSelected={dateInfo.day === day && dateInfo.isInMonth}
                onClickDayNumber={onChangeStoreDate}
                onMouseDown={onMouseDownCell}
              />
            ))}
          </Inner>
          <CalendarLayer
            calendarPlanView={calendarPlanViews?.[i]}
            selectedPlanView={selectedPlanViews?.[i]}
          />
          <OverlayWeek>
            {week.map(({ year: y, month: m }, j) => (
              <Inner
                key={`${y}${m}${j}`}
                css={{
                  position: 'relative',
                  backgroundColor:
                    y !== year || m !== month
                      ? 'rgba(255,255,255,.5)'
                      : 'transparent',
                }}
              />
            ))}
          </OverlayWeek>
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

const OverlayWeek = styled.div`
  z-index: 20;

  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
`;

export default CalendarView;
