import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import DirectionButtons from '@/components/buttons/DirectionButtons';
import PlusButton from '@/components/buttons/PlusButton';
import TodayButton from '@/components/buttons/TodayButton';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';
import {
  decreaseDayComparedFirstDay,
  increaseDayComparedLastDay,
} from '@/utils/dayHandler';

// 일정 추가 버튼 클릭시: 현재 선택된 년, 월, 일을 기준으로 modal 생성
// 좌우 버튼: 월 (이전달 다음달), 주 (선택된 일자를 기준으로 -7, +7), 일 (이전날 다음날)

const HeaderButtons = () => {
  const {
    year,
    month,
    day,
    onChangeStoreDate,
    decreaseStoreMonth,
    increaseStoreMonth,
  } = useDateState();
  const { selectedCalendarUnit } = useCalendarUnitState();

  const onClickLeftButton = () => {
    if (selectedCalendarUnit === '월') {
      decreaseStoreMonth();
    } else {
      const newDay = selectedCalendarUnit === '주' ? day - 7 : day - 1;
      const date = decreaseDayComparedFirstDay({ year, month, day: newDay });

      onChangeStoreDate(date);
    }
  };

  const onClickRightButton = () => {
    if (selectedCalendarUnit === '월') {
      increaseStoreMonth();
    } else {
      const newDay = selectedCalendarUnit === '주' ? day + 7 : day + 1;
      const date = increaseDayComparedLastDay({ year, month, day: newDay });
      onChangeStoreDate(date);
    }
  };

  const onClickTodayButton = () => {
    const today = moment();

    onChangeStoreDate({
      year: today.year(),
      month: today.month() + 1,
      day: today.date(),
    });
  };

  return (
    <Container>
      <PlusButton />
      <DirectionButtons
        onClickLeftButton={onClickLeftButton}
        onClickRightButton={onClickRightButton}
      />
      <TodayButton onClick={onClickTodayButton} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  column-gap: 0.5rem;
`;

export default HeaderButtons;
