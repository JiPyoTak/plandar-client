import React, { useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Calendar from '@/components/calendars/small';
import { TDateYMD } from '@/stores/date';
import { FONT_REGULAR_3 } from '@/styles/font';
import { decreaseMonth, increaseMonth } from '@/utils/calendar/monthHandler';
import { getDateString } from '@/utils/date/getTimeString';

interface Props {
  isInvalid?: boolean;
  onChangeDate: (date: TDateYMD) => void;
  date: TDateYMD;
  onCalendarClose?: () => void;
}

const DatePicker = ({
  isInvalid,
  onChangeDate,
  date,
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
            width: 100%;
            height: 100%;
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
          <Calendar
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
  width: 250px;
  height: fit-content;
  top: 35px;
  background-color: white;
  z-index: 20;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
`;

const CalendarDateButton = styled.button<{ isInvalid?: boolean }>`
  padding: 3px 5px;
  border-radius: 5px;
  background-color: ${({ isInvalid, theme }) =>
    isInvalid ? theme.red_light : theme.white};
  ${FONT_REGULAR_3}
  &:hover {
    background-color: ${({ isInvalid, theme }) =>
      isInvalid ? theme.red : theme.background3};
  }
`;

export default DatePicker;
