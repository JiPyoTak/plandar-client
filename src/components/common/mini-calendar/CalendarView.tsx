import React from 'react';

import styled from '@emotion/styled';

import { Moment, MomentInput } from 'moment';

import CalendarDay from '@/components/core/calendar/CalendarDay';
import { DATE_FORMAT } from '@/constants';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { getDayMoments } from '@/utils/calendar/getDayMoments';

interface IProps {
  referenceDate: Moment;
  selectedDate: Moment;
  onChangeDate: (date: MomentInput) => void;
}

const CalendarView: React.FC<IProps> = ({
  referenceDate,
  selectedDate,
  onChangeDate,
}) => {
  const { selectedCalendarUnit } = useCalendarUnitState();
  const dayMoments = getDayMoments(selectedDate);

  return (
    <Container>
      {dayMoments.map((dayMoment) => {
        const isWeeks =
          selectedDate.week() === dayMoment.week() &&
          selectedCalendarUnit === '주';
        return (
          <CalendarDay
            date={dayMoment}
            isInMonth={dayMoment.month() === selectedDate.month()}
            isWeeks={isWeeks}
            isWeeksStart={isWeeks && dayMoment.weekday() === 0}
            isWeeksEnd={isWeeks && dayMoment.weekday() === 6}
            isSelected={dayMoment.isSame(referenceDate)}
            onClick={onChangeDate}
            key={dayMoment.format(DATE_FORMAT)}
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
