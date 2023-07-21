import React, { memo } from 'react';

import styled from '@emotion/styled';

import moment, { Moment, MomentInput } from 'moment';

import { isBgBright } from '@/utils/color';

interface IProps {
  date: Moment;
  isSelected: boolean;
  isWeeks?: boolean;
  isWeeksStart?: boolean;
  isWeeksEnd?: boolean;
  className?: string;
  onClick: (date: MomentInput) => void;
}

const getClassNames = ({
  date,
  isWeeks,
  isWeeksStart,
  isWeeksEnd,
  isSelected,
}: IProps) => {
  const classNames = [];
  const today = moment();

  const isInMonth = today.month() === date.month();
  const isWeekend = date.weekday() === 0 || date.weekday() === 6;
  const isToday = moment().isSame(date, 'day');

  if (!isInMonth) classNames.push('in_month');
  if (isWeekend) classNames.push('is_weekend');
  if (isToday) classNames.push('is_today');
  if (!isToday && !isSelected) classNames.push('hover');
  if (isWeeks) classNames.push('is_weeks');
  if (isWeeksStart) classNames.push('is_weeks_start');
  if (isWeeksEnd) classNames.push('is_weeks_end');
  if (isSelected) classNames.push('is_selected');

  return classNames.join(' ');
};

const CalendarDay: React.FC<IProps> = (props) => {
  const { date, onClick, className } = props;
  const containerClassName = getClassNames(props);

  const onClickDay: React.MouseEventHandler = () => {
    onClick(date);
  };

  const onMouseDown: React.MouseEventHandler = (e) => {
    e.stopPropagation();
  };

  return (
    <Container className={`${containerClassName} ${className ?? ''}`}>
      <DayNumber onClick={onClickDay} onMouseDown={onMouseDown}>
        {date.date()}
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

  &.is_selected > button {
    background-color: ${({ theme }) => theme.primary_light};
    color: ${({ theme }) =>
      isBgBright(theme.primary_light2) ? theme.text1 : theme.white};
  }

  &.in_month > button {
    color: ${({ theme }) => theme.text3};
    opacity: 0.5;
  }

  &.is_weekend > button {
    color: ${({ theme }) => theme.text3};
  }

  &.is_today > button {
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.primary};
  }

  &.hover > button:hover {
    background-color: ${({ theme }) => theme.primary_light2};
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
`;

export default memo(CalendarDay);
