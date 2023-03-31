import React, { memo } from 'react';

import styled from '@emotion/styled';

import Day from './Day';
import { TDateYMD } from '@/stores/date';
import { getCalendarInfo } from '@/utils/getCalendarInfo';

// 달력을 생성하기 위한 date, 특정 일을 클릭시 실행될 event handler를 props로 받음
// 우선순위: 공휴일 > 주말 > 현재 달에 속하지 않는 일 > 평일

interface IProps {
  date: TDateYMD;
  onClickDayNumber: (date: TDateYMD) => void;
}

const BaseCalendar = ({ date, onClickDayNumber }: IProps) => {
  const calendarInfos = getCalendarInfo(date);

  return (
    <Container>
      {calendarInfos.map((dateInfo) => (
        <div key={`${dateInfo.month}${dateInfo.day}`}>
          <BaseCalendar.Day
            {...dateInfo}
            isSelected={dateInfo.day === date.day && dateInfo.isInMonth}
            onClick={onClickDayNumber}
          />
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 1fr);

  align-items: stretch;
  justify-items: center;

  & > div {
    display: flex;
  }
`;

BaseCalendar.Day = Day;

export default memo(Base);
