import React, { memo } from 'react';

import styled from '@emotion/styled';

import Day from '@/components/core/calendar/CalendarDay';
import TimePlanList from '@/components/home/main/calendar/CalendarTimePlans';
import Plan from '@/core/plan/Plan';
import useDateState, { TDateYMD } from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
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

  const onChangeCalendarUnit = useCalendarUnitState(
    (state) => state.selectCalendarUnit,
  );
  const onChangeStoreDate = useDateState((state) => state.onChangeStoreDate);

  const onClickDay = (date: TDateYMD) => {
    onChangeCalendarUnit('일');
    onChangeStoreDate(date);
  };

  return (
    <Container
      className="date-time"
      isLastDay={isLastDay}
      isLastWeek={isLastWeek}
      data-date={format}
      onMouseDown={onMouseDown}
    >
      <CellDay {...dateInfo} isSelected={isSelected} onClick={onClickDay} />
      <div css={{ height, transition: 'height 0.2s' }} />
      <TimePlanList timePlans={timePlans} />
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

export default memo(CalendarCell);
