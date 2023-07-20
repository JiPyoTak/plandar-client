import React, { useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import MiniCalendar from '@/components/common/mini-calendar';
import { TDateYMD } from '@/stores/date';
import { FONT_REGULAR_4 } from '@/styles/font';
import { decreaseMonth, increaseMonth } from '@/utils/calendar/monthHandler';
import { getDateString } from '@/utils/date/getTimeString';

interface Props {
  isInvalid?: boolean;
  date: TDateYMD;
  onChangeDate: (date: TDateYMD) => void;
  onCalendarClose?: () => void;
}

const DatePicker = ({
  isInvalid,
  date,
  onChangeDate,
  onCalendarClose,
}: Props) => {
  const today = new Date();
  const todayYMD = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
  };
  const [calendarOpened, setCalendarOpened] = useState(false);
  const [currentYMD, setCurrentYMD] = useState({ ...date });

  const onCloseHandler = () => {
    onCalendarClose?.();
    setCurrentYMD({ ...date });
    setCalendarOpened(false);
  };

  const onChangeDateHandler = (date: TDateYMD) => {
    onChangeDate(date);
    setCurrentYMD(date);
    setCalendarOpened(false);
  };

  return (
    <>
      {calendarOpened && (
        <div
          onMouseDown={onCloseHandler}
          css={css`
            z-index: 20;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          `}
        />
      )}
      <CalendarDateButton
        isInvalid={isInvalid}
        onClick={() => setCalendarOpened(true)}
      >
        {getDateString(date)}
      </CalendarDateButton>
      {calendarOpened && (
        <CalendarContainer>
          <MiniCalendar
            today={todayYMD}
            currentDate={currentYMD}
            onChangeDate={onChangeDateHandler}
            increaseMonth={() => setCurrentYMD(increaseMonth)}
            decreaseMonth={() => setCurrentYMD(decreaseMonth)}
            onClickTodayButton={() => setCurrentYMD(todayYMD)}
          />
        </CalendarContainer>
      )}
    </>
  );
};

const CalendarContainer = styled.div`
  position: absolute;

  z-index: 20;

  width: 280px;
  height: fit-content;

  margin-top: 0.75rem;
  padding: 0.75rem;
  border-radius: 5px;
  background-color: white;
  box-shadow: rgb(0 0 0 / 15%) 0px 4px 16px 0px;
`;

const CalendarDateButton = styled.button<{ isInvalid?: boolean }>`
  padding: 3px 5px;
  border-radius: 5px;
  background-color: ${({ isInvalid, theme }) =>
    isInvalid ? theme.red_light : theme.white};
  ${FONT_REGULAR_4}
  &:hover {
    background-color: ${({ isInvalid, theme }) =>
      isInvalid ? theme.red : theme.background3};
  }
`;

export default DatePicker;
