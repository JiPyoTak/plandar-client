import React from 'react';

import styled from '@emotion/styled';

import { TDateYMD } from '@/stores/date';
import { FONT_BOLD_1 } from '@/styles/font';
import { TCalendarUnit, TDayOfWeekUnit } from '@/types';

interface IProps extends TDateYMD {
  dayOfWeek: TDayOfWeekUnit;
  selectedCalendarUnit: TCalendarUnit;
}

const HeaderTitle: React.FC<IProps> = ({
  day,
  dayOfWeek,
  month,
  year,
  selectedCalendarUnit,
}) => {
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
