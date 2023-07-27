import React, { useState } from 'react';

import styled from '@emotion/styled';

import moment, { Moment, MomentInput } from 'moment';

import MiniCalendar from '@/components/common/mini-calendar';
import Background from '@/components/modal/plan/create/Background';
import useModalPopupPosition from '@/hooks/modal/useModalPopupPositon';
import { FONT_REGULAR_4 } from '@/styles/font';
import { getDateString } from '@/utils/date/getTimeString';

interface Props {
  date: Moment;
  onChangeDate: (date: MomentInput) => boolean;
  onCalendarClose?: () => void;
}

const DatePicker = ({ date, onChangeDate, onCalendarClose }: Props) => {
  const { positionTopRef, setPositionTop } = useModalPopupPosition();

  const referenceDate = moment(date);
  const [currentDate, setCurrentDate] = useState(moment(date));
  const [calendarOpened, setCalendarOpened] = useState(false);

  const onCloseHandler = () => {
    onCalendarClose?.();
    setCurrentDate(moment(date));
    setCalendarOpened(false);
  };

  const onChangeDateHandler = (date: MomentInput) => {
    const isValid = onChangeDate(date);

    if (isValid) setCurrentDate(moment(date));

    setCalendarOpened(false);
  };

  const increaseMonth = () => {
    setCurrentDate((prev) => moment(prev).add(1, 'month'));
  };

  const decreaseMonth = () => {
    setCurrentDate((prev) => moment(prev).subtract(1, 'month'));
  };

  const onClickTodayButton = () => {
    setCurrentDate(moment());
  };

  const onClickDateButton: React.MouseEventHandler = (e) => {
    const target = e.target as HTMLButtonElement;

    setPositionTop(target.getBoundingClientRect());
    setCalendarOpened(true);
  };

  return (
    <div>
      <CalendarDateButton onClick={onClickDateButton}>
        {getDateString(date.toDate())}
      </CalendarDateButton>
      <Background isOpen={calendarOpened} onClose={onCloseHandler} />
      {calendarOpened && (
        <CalendarContainer
          css={{
            top: positionTopRef.current,
          }}
        >
          <MiniCalendar
            referenceDate={referenceDate}
            selectedDate={currentDate}
            setReferenceDate={onChangeDateHandler}
            increaseMonth={increaseMonth}
            decreaseMonth={decreaseMonth}
            onClickTodayButton={onClickTodayButton}
          />
        </CalendarContainer>
      )}
    </div>
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

const CalendarDateButton = styled.button`
  padding: 3px 5px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.white};
  ${FONT_REGULAR_4}

  &:hover {
    background-color: ${({ theme }) => theme.background3};
  }
`;

export default DatePicker;
