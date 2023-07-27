import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import DirectionButtons from '@/components/core/buttons/DirectionButtons';
import PlusButton from '@/components/core/buttons/PlusButton';
import TodayButton from '@/components/core/buttons/TodayButton';
import useDateState from '@/stores/date';

const HeaderButtons = () => {
  const {
    referenceDate,
    setReferenceDate,
    increaseReferenceDate,
    decreaseReferenceDate,
  } = useDateState();
  const calendarUnit = useDateState(({ calendarUnit }) => calendarUnit);

  const onClickLeftButton = () => {
    if (calendarUnit === 'month') {
      decreaseReferenceDate();
    } else {
      const decreaseTerm = calendarUnit === 'week' ? 7 : 1;
      const newDate = moment(referenceDate).subtract(decreaseTerm, 'day');
      setReferenceDate(newDate);
    }
  };

  const onClickRightButton = () => {
    if (calendarUnit === 'month') {
      increaseReferenceDate();
    } else {
      const decreaseTerm = calendarUnit === 'week' ? 7 : 1;
      const newDate = moment(referenceDate).add(decreaseTerm, 'day');
      setReferenceDate(newDate);
    }
  };

  const onClickTodayButton = () => {
    setReferenceDate(moment());
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
