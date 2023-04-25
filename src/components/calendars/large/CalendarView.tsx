import React from 'react';

import styled from '@emotion/styled';

import CalendarCell from './CalendarCell';
import CalendarLayer from './CalendarLayer';
import useDrag, { MouseEventHandler } from '@/hooks/drag/useDrag';
import useDateState from '@/stores/date';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { getStartAndEndDateInMonth } from '@/utils/dayHandler';
import { getCalendarInfo } from '@/utils/getCalendarInfo';
import { getCalendarPlans } from '@/utils/getCalendarPlans';
import { dummy } from '@/utils/plan/dummy';

const CalendarView = () => {
  const { selectedPlan, selectPlan } = useSelectedPlanState();
  const { onChangeStoreDate, year, month, day } = useDateState();
  const [isDragging, currentDate, changeCurrentDate, onMouseMove] = useDrag();

  const calendarInfos = getCalendarInfo({ year, month, day });
  const dates = getStartAndEndDateInMonth(calendarInfos);
  const selectedPlanArgs = selectedPlan ? [selectedPlan] : [];

  const calendarPlanViews = getCalendarPlans(dummy, ...dates);
  const selectedPlanViews = getCalendarPlans(selectedPlanArgs, ...dates);

  const onMouseDownCell: MouseEventHandler = (e) => {
    const targetDate = (e.target as HTMLElement).dataset?.date;

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
      onMouseMove={currentDate ? onMouseMove : undefined}
      onMouseDown={changeCurrentDate}
    >
      {calendarInfos.map((week, i) => (
        <CalendarView.Inner key={`${week[i].day}${i}`}>
          <CalendarView.Inner>
            {week.map((dateInfo, j) => (
              <CalendarView.Cell
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
          </CalendarView.Inner>
          <CalendarLayer
            calendarPlanView={calendarPlanViews?.[i]}
            selectedPlanView={selectedPlanViews?.[i]}
          />
        </CalendarView.Inner>
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

CalendarView.Cell = CalendarCell;
CalendarView.Inner = Inner;

export default CalendarView;
