import React from 'react';

import styled from '@emotion/styled';

import { DAY_OF_WEEK_UNIT } from '@/utils/constants';

interface IProps {
  className?: string;
}

const DayOfWeek: React.FC<IProps> = ({ className }) => {
  return (
    <Container className={className}>
      {DAY_OF_WEEK_UNIT.map((day) => (
        <div
          key={day}
          className={day === '토' || day === '일' ? 'weekend' : ''}
        >
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

  & > .weekend {
    color: ${({ theme }) => theme.text3};
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default DayOfWeek;
