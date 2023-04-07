import React, { memo } from 'react';

import styled from '@emotion/styled';

import { TDateYMD } from '@/stores/date';
import { TPickIsBoolean } from '@/types';
import { ICalendarInfo } from '@/utils/getCalendarInfo';
import { getDayClassName } from '@/utils/getDayClassName';

interface IProps extends ICalendarInfo {
  isSelected: boolean;
  onClick: (date: TDateYMD) => void;
}

const CalendarDay: React.FC<IProps> = (props) => {
  const { day, month, year, onClick, ...isBooleans } = props;
  const className = getDayClassName(isBooleans);

  const onClickDay: React.MouseEventHandler = (e) => {
    e.stopPropagation();
    onClick({ day, month, year });
  };

  return (
    <Container className={className} onClick={onClickDay} {...isBooleans}>
      <div>{day}</div>
    </Container>
  );
};

const Container = styled.div<TPickIsBoolean>`
  position: relative;

  border-radius: 100%;

  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 0.8rem;

  color: ${({ theme }) => theme.text1};

  cursor: pointer;

  &.in_month {
    color: ${({ theme }) => theme.text3};
    opacity: 0.5;
  }

  &.is_weekend {
    color: ${({ theme }) => theme.text3};
  }

  &.is_selected {
    background-color: ${({ theme }) => theme.emerald};
  }

  &.is_today {
    color: ${({ theme }) => theme.white};
    background-color: ${({ theme }) => theme.primary_dark};
  }

  &.hover {
    &:hover {
      background-color: ${({ theme }) => theme.emerald_light};
    }
  }
`;

export default memo(CalendarDay);
