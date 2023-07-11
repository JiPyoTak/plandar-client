import React, { memo } from 'react';

import styled from '@emotion/styled';

import { TDateYMD } from '@/stores/date';
import { ICalendarInfo } from '@/utils/calendar/getCalendarInfo';
import { getDayClassName } from '@/utils/calendar/getDayClassName';
import { isBgBright } from '@/utils/color';

interface IProps extends ICalendarInfo {
  isSelected: boolean;
  isWeeks?: boolean;
  isWeeksStart?: boolean;
  isWeeksEnd?: boolean;
  className?: string;
  onClick: (date: TDateYMD) => void;
}

const getClassNames = ({
  isWeeks,
  isWeeksStart,
  isWeeksEnd,
}: {
  isWeeks?: boolean;
  isWeeksStart?: boolean;
  isWeeksEnd?: boolean;
}) => {
  const classNames = [];

  if (isWeeks) classNames.push('is_weeks');
  if (isWeeksStart) classNames.push('is_weeks_start');
  if (isWeeksEnd) classNames.push('is_weeks_end');

  return classNames.join(' ');
};

const CalendarDay: React.FC<IProps> = (props) => {
  const {
    day,
    month,
    year,
    onClick,
    isWeeks,
    isWeeksStart,
    isWeeksEnd,
    className,
    ...isBooleans
  } = props;
  const containerClassName = getClassNames({
    isWeeks,
    isWeeksStart,
    isWeeksEnd,
  });
  const dayNumberClassName = getDayClassName(isBooleans);

  const onClickDay: React.MouseEventHandler = () => {
    onClick({ day, month, year });
  };

  const onMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <Container className={`${containerClassName} ${className ?? ''}`}>
      <DayNumber
        className={dayNumberClassName}
        onClick={onClickDay}
        onMouseDown={onMouseDown}
      >
        {day}
      </DayNumber>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s, border-radius 0.2s;
  padding: 0.2rem 0;

  &.is_weeks {
    background-color: ${({ theme }) => theme.primary_light}22;
  }

  &.is_weeks_start {
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  &.is_weeks_end {
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`;

const DayNumber = styled.button`
  width: 28px;
  height: 28px;

  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.8rem;

  color: ${({ theme }) => theme.text1};

  cursor: pointer;
  transition: background-color 0.2s;
  background-color: transparent;

  &.in_month {
    color: ${({ theme }) => theme.text3};
    opacity: 0.5;
  }

  &.is_weekend {
    color: ${({ theme }) => theme.text3};
  }

  &.is_selected {
    background-color: ${({ theme }) => theme.primary_light};
    color: ${({ theme }) =>
      isBgBright(theme.primary_light2) ? theme.text1 : theme.white};
  }

  &.is_today {
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.primary};
  }

  &.hover:hover {
    background-color: ${({ theme }) => theme.primary_light2};
  }
`;

export default memo(CalendarDay);
