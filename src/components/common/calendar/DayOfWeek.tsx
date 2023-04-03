import React from 'react';

import styled from '@emotion/styled';

const DAY_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토'] as const;

const DayOfWeek = () => {
  return (
    <Container>
      {DAY_OF_WEEK.map((day) => (
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
