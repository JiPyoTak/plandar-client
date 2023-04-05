import React from 'react';

import styled from '@emotion/styled';

import { DAY_OF_WEEK_UNIT } from '@/utils/constants';

const DayOfWeek = () => {
  return (
    <Container>
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: stretch;

  & > .weekend {
    color: ${({ theme }) => theme.text3};
  }
  & > div {
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default DayOfWeek;
