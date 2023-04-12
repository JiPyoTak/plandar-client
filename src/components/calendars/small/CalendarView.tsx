import React from 'react';

import styled from '@emotion/styled';

import CalendarDay from '@/components/common/calendar/CalendarDay';
import { TDateYMD } from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { compareStoreDateToCalendarInfo } from '@/utils/compareStoreDateToCalendarInfo';
import { getCalendarInfo } from '@/utils/getCalendarInfo';

interface IProps {
  date: TDateYMD;
  storeDate: TDateYMD;
  onChangeDate: (date: TDateYMD) => void;
}

const CalendarView: React.FC<IProps> = ({ date, storeDate, onChangeDate }) => {
  const { selectedCalendarUnit } = useCalendarUnitState();
  const calendarInfos = getCalendarInfo(date).flat();

  const weeks = calendarInfos.reduce((acc, cur, i) => {
    const isSelected = compareStoreDateToCalendarInfo(cur, storeDate);

    return isSelected ? Math.floor(i / 7) : acc;
  }, -1);

  return (
    <Container>
      {calendarInfos.map((info, i) => {
        const isWeeks =
          Math.floor(i / 7) === weeks && selectedCalendarUnit === '주';
        return (
          <CalendarDay
            {...info}
            isWeeks={isWeeks}
            isWeeksStart={isWeeks && i % 7 === 0}
            isWeeksEnd={isWeeks && i % 7 === 6}
            isSelected={compareStoreDateToCalendarInfo(info, storeDate)}
            onClick={onChangeDate}
            key={`${info.month}${info.day}`}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  width: 100%;

  display: grid;
  grid-template-columns: repeat(7, 1fr);

  align-items: stretch;
  justify-items: center;

  user-select: none;
`;

export default CalendarView;
