import React, { memo } from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import ChevronIcon from '@/components/icons/ChevronIcon';
import { TDateYMD } from '@/stores/date';
import { FONT_REGULAR_4, FONT_REGULAR_6 } from '@/styles/font';

interface IProps {
  year: number;
  month: number;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  onChangeStoreDate: (date: TDateYMD) => void;
}

const CalendarHeader: React.FC<IProps> = (props) => {
  const { year, month, increaseMonth, decreaseMonth, onChangeStoreDate } =
    props;

  const onClickToday = () => {
    const today = moment();

    onChangeStoreDate({
      year: today.year(),
      month: today.month() + 1,
      day: today.date(),
    });
  };

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
      <button onClick={onClickToday}>오늘</button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 0.3rem;

  margin-bottom: 0.3rem;

  & > div {
    flex: 1;
    padding: 0 8px;
    ${FONT_REGULAR_4}
  }

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 22px;

    border-radius: 5px;
    padding: 2px;

    background-color: ${({ theme }) => theme.background2};

    &:hover {
      background-color: ${({ theme }) => theme.background3};
    }
  }

  & > button:last-of-type {
    ${FONT_REGULAR_6}
    padding: 0.5rem;
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
