import React, { memo } from 'react';

import styled from '@emotion/styled';

import CeilContent from './CeilContent';
import Day from '@/components/common/calendar/CalendarDay';
import { TDateYMD } from '@/stores/date';
import { ICalendarInfo } from '@/utils/getCalendarInfo';

interface IProps {
  isLastWeek: boolean;
  isLastDay: boolean;
  dateInfo: ICalendarInfo;
  isSelected: boolean;
  onClickDayNumber: (date: TDateYMD) => void;
  onClickDayContent: () => void;
}

const CalendarCell: React.FC<IProps> = (props) => {
  const {
    dateInfo,
    isSelected,
    isLastDay,
    isLastWeek,
    onClickDayNumber,
    onClickDayContent,
  } = props;

  return (
    <Container
      onClick={onClickDayContent}
      isLastDay={isLastDay}
      isLastWeek={isLastWeek}
    >
      <CellDay
        {...dateInfo}
        isSelected={isSelected}
        onClick={onClickDayNumber}
      />
      <CeilContent></CeilContent>
    </Container>
  );
};

const Container = styled.div<Pick<IProps, 'isLastDay' | 'isLastWeek'>>`
  width: 100%;
  display: flex;
  flex-direction: column;

  ${({ isLastDay, theme }) =>
    !isLastDay && `border-right: 1px solid ${theme.border1};`}
  ${({ isLastWeek, theme }) =>
    !isLastWeek && `border-bottom: 1px solid ${theme.border1};`}


  padding: 0.5rem;

  cursor: pointer;
`;

const CellDay = styled(Day)`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export default memo(CalendarCell);
