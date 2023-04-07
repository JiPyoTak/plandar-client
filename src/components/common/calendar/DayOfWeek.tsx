import React from 'react';

import styled from '@emotion/styled';

import { TDayOfWeekUnit } from '@/types';
import { DAY_OF_WEEK_UNIT } from '@/utils/constants';

interface IProps {
  className?: string;
}

const DAY_OF_WEEK: {
  [key in TDayOfWeekUnit]?: string;
} = {
  일: 'sunday',
  토: 'saturday',
};

const DayOfWeek: React.FC<IProps> = ({ className }) => {
  return (
    <Container className={className}>
      {DAY_OF_WEEK_UNIT.map((day) => (
        <div key={day} className={DAY_OF_WEEK[day] ?? ''}>
          {day}
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;

  & > .sunday {
    color: ${({ theme }) => theme.red};
  }

  & > .saturday {
    color: ${({ theme }) => theme.blue_dark};
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default DayOfWeek;
