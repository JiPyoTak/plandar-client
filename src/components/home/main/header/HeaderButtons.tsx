import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import DirectionButtons from '@/components/core/buttons/DirectionButtons';
import PlusButton from '@/components/core/buttons/PlusButton';
import TodayButton from '@/components/core/buttons/TodayButton';
import useDateState from '@/stores/date';

const HeaderButtons = () => {
  const { setReferenceDate, increaseReferenceDate, decreaseReferenceDate } =
    useDateState(
      ({ setReferenceDate, increaseReferenceDate, decreaseReferenceDate }) => ({
        setReferenceDate,
        increaseReferenceDate,
        decreaseReferenceDate,
      }),
    );

  const onClickTodayButton = () => {
    setReferenceDate(moment());
  };

  return (
    <Container>
      <PlusButton />
      <DirectionButtons
        onClickLeftButton={decreaseReferenceDate}
        onClickRightButton={increaseReferenceDate}
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
