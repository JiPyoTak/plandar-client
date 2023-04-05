import React, { memo } from 'react';

import styled from '@emotion/styled';

import { TDateYMD } from '@/stores/date';
import { ICalendarInfo } from '@/utils/getCalendarInfo';

interface IProps extends ICalendarInfo {
  isSelected: boolean;
  onClick: (date: TDateYMD) => void;
}

type PickIsBoolean = Pick<IProps, 'isToday' | 'isInMonth' | 'isWeekend'>;

const CalendarDay: React.FC<IProps> = (props) => {
  const { day, month, year, onClick, ...isBooleans } = props;

  const onClickDay = () => {
    onClick({ day, month, year });
  };

  return (
    <Container {...isBooleans} onClick={onClickDay}>
      <div>{day}</div>
    </Container>
  );
};

const Container = styled.div<PickIsBoolean & { isSelected: boolean }>`
  cursor: pointer;
  border-radius: 100%;

  width: 2rem;
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1rem;

  ${({ isInMonth, isWeekend, isToday, isSelected, theme }) => {
    let color = theme.text1;
    let opacity = 1;
    let backgroundColor = null;

    if (!isInMonth) {
      color = theme.text3;
      opacity = 0.5;
    }
    if (isWeekend) {
      color = theme.text3;
    }

    if (isSelected) {
      backgroundColor = theme.background3;
    }
    if (isToday) {
      color = theme.white;
      backgroundColor = theme.black;
    }

    return `
      color: ${color};
      opacity: ${opacity};
      ${backgroundColor ? `background-color: ${backgroundColor}` : ''};
      &:hover {
        ${backgroundColor ? '' : `background-color: ${theme.background3};`}
        opacity: 0.7;
      }
    `;
  }}
`;

export default memo(CalendarDay);
