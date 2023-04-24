import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import CalendarCell from './CalendarCell';
import CalendarLayer from './CalendarLayer';
import { dummy } from './dummy';
import useDrag, { MouseEventHandler } from '@/hooks/drag/useDrag';
import useDateState from '@/stores/date';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { IViewPlanInfo } from '@/types';
import { getStartAndEndDateInMonth } from '@/utils/dayHandler';
import { getCalendarInfo } from '@/utils/getCalendarInfo';
import { getCalendarPlans } from '@/utils/getCalendarPlans';

const CalendarBody = () => {
  const { selectedPlan, selectPlan } = useSelectedPlanState();
  const { onChangeStoreDate, year, month, day } = useDateState();
  const [isDragging, changeCurrentDate, onMouseMove] = useDrag();

  const calendarInfos = getCalendarInfo({ year, month, day });
  const [startDate, endDate] = getStartAndEndDateInMonth(calendarInfos);
  const calendarPlanViews = getCalendarPlans(dummy, startDate, endDate);

  const [selectedPlanViews, setSelectedPlanViews] = useState<
    IViewPlanInfo[][][] | null
  >(null);

  const onMouseDownCell: MouseEventHandler = (e) => {
    e.stopPropagation();

    changeCurrentDate(e);

    const target = document
      .elementsFromPoint(e.clientX, e.clientY)
      .find((el) => el.classList.contains('dateTime')) as HTMLElement;

    const targetDate = target?.dataset?.date;

    if (!targetDate) return;

    const newPlan = {
      id: -1,
      startTime: targetDate,
      endTime: targetDate,
    };

    selectPlan(newPlan);
  };

  useEffect(() => {
    if (!selectedPlan) return setSelectedPlanViews(null);

    const newPlan = getCalendarPlans([selectedPlan], startDate, endDate);

    setSelectedPlanViews(newPlan);
  }, [selectedPlan]);

  return (
    <Container
      className={isDragging ? 'isDragging' : ''}
      onMouseMove={isDragging ? onMouseMove : undefined}
      onMouseDown={changeCurrentDate}
    >
      {calendarInfos.map((week, i) => (
        <CalendarBody.Inner key={`${week[i].day}${i}`}>
          <CalendarBody.Inner>
            {week.map((dateInfo, j) => (
              <CalendarBody.Cell
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
          </CalendarBody.Inner>
          <CalendarLayer
            calendarPlanView={calendarPlanViews?.[i]}
            selectedPlanView={selectedPlanViews?.[i]}
          />
        </CalendarBody.Inner>
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

CalendarBody.Cell = CalendarCell;
CalendarBody.Inner = Inner;

export default CalendarBody;
