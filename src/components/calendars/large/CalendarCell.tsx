import React, { memo } from 'react';

import styled from '@emotion/styled';

import Day from '@/components/common/calendar/CalendarDay';
import DayTimePlan from '@/components/plan/DayTimePlan';
import Plan from '@/plan/Plan';
import useDateState from '@/stores/date';
import { ICalendarInfo } from '@/utils/calendar/getCalendarInfo';

interface IProps {
  height: number;
  format: string;
  dateInfo: ICalendarInfo;
  isLastWeek: boolean;
  isLastDay: boolean;
  isSelected: boolean;
  timePlans: Plan[];
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CalendarCell: React.FC<IProps> = (props) => {
  const {
    height,
    dateInfo,
    isSelected,
    isLastDay,
    isLastWeek,
    format,
    timePlans,
    onMouseDown,
  } = props;

  const onChangeStoreDate = useDateState((state) => state.onChangeStoreDate);

  return (
    <Container
      className="date-time"
      isLastDay={isLastDay}
      isLastWeek={isLastWeek}
      data-date={format}
      onMouseDown={onMouseDown}
    >
      <CellDay
        {...dateInfo}
        isSelected={isSelected}
        onClick={onChangeStoreDate}
      />
      <div style={{ height }} />
      <TimePlanList>
        {timePlans.map((timePlan) => (
          <DayTimePlan plan={timePlan} />
        ))}
      </TimePlanList>
    </Container>
  );
};

const Container = styled.div<Pick<IProps, 'isLastDay' | 'isLastWeek'>>`
  flex: 1;
  display: flex;
  flex-direction: column;

  ${({ isLastDay, theme }) =>
    !isLastDay && `border-right: 1px solid ${theme.border1};`}
  ${({ isLastWeek, theme }) =>
    !isLastWeek && `border-bottom: 1px solid ${theme.border1};`}

  cursor: pointer;

  // fix when give min-width
  overflow: hidden;

  &.isDragging,
  &.isDragging * {
    cursor: grabbing !important;
  }
`;

const CellDay = styled(Day)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

  padding: 4px;
`;

const TimePlanList = styled.div`
  display: flex;
  flex-direction: column;
`;

export default memo(CalendarCell);
