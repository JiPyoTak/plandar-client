import React from 'react';

import styled from '@emotion/styled';

import { DAY_OF_WEEK_UNIT } from '@/constants';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import { FONT_BOLD_1 } from '@/styles/font';

const HeaderTitle: React.FC = () => {
  const referenceDate = useDateState(({ referenceDate }) => referenceDate);
  const { selectedCalendarUnit } = useCalendarUnitState();

  const year = referenceDate.year();
  const month = referenceDate.month();
  const day = referenceDate.date();
  const dayOfWeek = DAY_OF_WEEK_UNIT[referenceDate.day()];

  const description =
    selectedCalendarUnit === '일' ? `${day}일 (${dayOfWeek})` : '';

  return (
    <Container>
      {year}년 {month}월 {description}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;

  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  ${FONT_BOLD_1}
`;

export default HeaderTitle;
