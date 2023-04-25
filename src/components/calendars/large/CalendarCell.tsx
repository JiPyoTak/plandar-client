import React, { memo } from 'react';

import styled from '@emotion/styled';

import Day from '@/components/common/calendar/CalendarDay';
import { TDateYMD } from '@/stores/date';
import { ICalendarInfo } from '@/utils/getCalendarInfo';

interface IProps {
  height: number;
  format: string;
  dateInfo: ICalendarInfo;
  isLastWeek: boolean;
  isLastDay: boolean;
  isSelected: boolean;

  onClickDayNumber: (date: TDateYMD) => void;
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
    onClickDayNumber,
    onMouseDown,
  } = props;

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
        onClick={onClickDayNumber}
      />
      <div style={{ height }} />
      <div></div>
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
