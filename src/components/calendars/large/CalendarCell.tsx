import React, { memo } from 'react';

import styled from '@emotion/styled';

import Day from '@/components/common/calendar/CalendarDay';
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
      className="dateTime"
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
      <div>{timePlans.map((t) => t.title)}</div>
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

export default memo(CalendarCell);
