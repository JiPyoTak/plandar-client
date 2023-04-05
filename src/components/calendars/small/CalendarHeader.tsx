import React, { memo } from 'react';

import styled from '@emotion/styled';

import ChevronIcon from '@/components/icons/ChevronIcon';
import { FONT_BOLD_4 } from '@/styles/font';

interface IProps {
  year: number;
  month: number;
  increaseMonth: () => void;
  decreaseMonth: () => void;
}

const CalendarHeader = (props: IProps) => {
  const { year, month, increaseMonth, decreaseMonth } = props;

  return (
    <Container>
      <div>
        {year}년 {month}월
      </div>
      <button onClick={decreaseMonth}>
        <ChevronIcon type="left" />
      </button>
      <button onClick={increaseMonth}>
        <ChevronIcon type="right" />
      </button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  & > div {
    flex: 1;
    font-size: ${FONT_BOLD_4};
    padding: 0 8px;
  }

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;
    border-radius: 5px;

    &:hover {
      background-color: ${({ theme }) => theme.background2};
    }
  }

  & svg {
    width: 18px;
    height: 18px;
    & path {
      stroke: ${({ theme }) => theme.text3};
    }
  }
`;

export default memo(CalendarHeader);
