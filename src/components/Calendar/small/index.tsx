import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import CalendarHeader from './CalendarHeader';
import BaseCalendar from '@/components/common/calendar';
import useDateStore from '@/stores/date';
import { theme } from '@/styles/theme';

// 작은 달력
// - 월/주: 일자 클릭시 해당 날짜가 현재 월에 포함된 날짜인지 검사 후 포함되지 않으면 이전/다음 월로 이동
// - 주: 일자 클릭시 해당 날짜가 현재 주에 포함된 날짜인지 검사 후 포함된다면 해당 주차를 달력에 표시
// - 일: 일자 클릭시 선택된 날짜로 이동

const ALL_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = () => {
  const dateState = useDateStore();
  const {
    year,
    month,
    day,
    increaseMonth,
    decreaseMonth,
    onChangeDate: onChangeDay,
  } = dateState;

  return (
    <Container>
      <CalendarHeader
        year={year}
        month={month}
        increaseMonth={increaseMonth}
        decreaseMonth={decreaseMonth}
      />
      <AllDay>
        {ALL_DAYS.map((day) => (
          <div key={day} css={(day === '일' || day === '토') && Color}>
            {day}
          </div>
        ))}
      </AllDay>
      <BaseCalendar
        date={{ year, month, day }}
        onClickDayNumber={onChangeDay}
      />
    </Container>
  );
};

const Color = css`
  color: ${theme.text3};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
  font-size: 0.8rem;
  padding: 0 2rem 0 2rem;
`;

const AllDay = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;

  & > div {
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Calendar;
