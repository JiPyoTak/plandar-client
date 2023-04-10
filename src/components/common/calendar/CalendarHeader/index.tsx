import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import HeaderTitle from './HeaderTitle';
import LeftButtons from './ReftButtons';
import CalendarUnitButton from '@/components/buttons/CalendarUnitButton';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { DAY_OF_WEEK_UNIT } from '@/utils/constants';

const CalendarHeader = () => {
  const { year, month, day } = useDateState();
  const { selectedCalendarUnit } = useCalendarUnitState();
  const date = moment({ year, month: month - 1, day });

  return (
    <Container>
      <LeftButtons />
      <HeaderTitle
        selectedCalendarUnit={selectedCalendarUnit}
        year={year}
        month={month}
        day={day}
        dayOfWeek={DAY_OF_WEEK_UNIT[date.day()]}
      />
      <CalendarUnitButton />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 4rem;

  padding: 0.5rem 1rem;

  display: flex;

  align-items: center;
  justify-content: space-between;
`;

export default CalendarHeader;
