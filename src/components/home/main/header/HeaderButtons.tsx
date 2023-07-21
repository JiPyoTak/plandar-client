import React from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import DirectionButtons from '@/components/core/buttons/DirectionButtons';
import PlusButton from '@/components/core/buttons/PlusButton';
import TodayButton from '@/components/core/buttons/TodayButton';
import useDateState from '@/stores/date';
import useCalendarUnitState from '@/stores/date/calendarUnit';

const HeaderButtons = () => {
  const {
    referenceDate,
    setReferenceDate,
    decreaseStoreMonth,
    increaseStoreMonth,
  } = useDateState();
  const { selectedCalendarUnit } = useCalendarUnitState();

  const onClickLeftButton = () => {
    if (selectedCalendarUnit === '월') {
      decreaseStoreMonth();
    } else {
      const decreaseTerm = selectedCalendarUnit === '주' ? 7 : 1;
      const newDate = moment(referenceDate).subtract(decreaseTerm, 'day');
      setReferenceDate(newDate);
    }
  };

  const onClickRightButton = () => {
    if (selectedCalendarUnit === '월') {
      increaseStoreMonth();
    } else {
      const decreaseTerm = selectedCalendarUnit === '주' ? 7 : 1;
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
