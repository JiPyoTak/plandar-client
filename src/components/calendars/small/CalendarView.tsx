import React, { ReactElement, useRef } from 'react';

import styled from '@emotion/styled';

import WeekLayer from './WeekLayer';
import CalendarDay from '@/components/common/calendar/CalendarDay';
import { TDateYMD } from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { ICalendarInfo, getCalendarInfo } from '@/utils/getCalendarInfo';

interface IProps {
  date: TDateYMD;
  onChangeDate: (date: TDateYMD) => void;
}

const CalendarView: React.FC<IProps> = ({ date, onChangeDate }) => {
  const { selectedCalendarUnit } = useCalendarUnitState();
  const calendarInfos = getCalendarInfo(date);
  const weeks = useRef(
    calendarInfos.reduce((acc, cur, i) => {
      const isSelected = cur.some(
        (info) => info.day === date.day && info.isInMonth,
      );

      return isSelected ? i : acc;
    }, 0),
  );

  const paintCalendarDays = (dateInfos: ICalendarInfo[], i: number) => {
    const Days: ReactElement[] = [];

    for (let j = 0; j < dateInfos.length; j++) {
      const dateInfo = dateInfos[j];
      const isSelected = dateInfo.day === date.day && dateInfo.isInMonth;

      if (isSelected && weeks.current !== i) weeks.current = i;

      Days.push(
        <CalendarDay
          {...dateInfo}
          isSelected={isSelected}
          onClick={onChangeDate}
          key={`${dateInfo.month}${dateInfo.day}`}
        />,
      );
    }

    return Days;
  };

  return (
    <Container>
      {selectedCalendarUnit === '주' && <WeekLayer weeks={weeks.current} />}
      {calendarInfos.map(paintCalendarDays)}
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
