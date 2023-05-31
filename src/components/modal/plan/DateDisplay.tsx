import React from 'react';

import styled from '@emotion/styled';

import { shallow } from 'zustand/shallow';

import useFocusedPlanState from '@/stores/plan/focusedPlan';

const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
} as const;

const DateDisplay: React.FC = () => {
  const { startTime, endTime } = useFocusedPlanState((store) => {
    const { focusedPlan } = store;
    const startTime = Intl.DateTimeFormat(navigator.language, options).format(
      new Date(focusedPlan?.startTime ?? Date.now()),
    );
    const endTime = Intl.DateTimeFormat(navigator.language, options).format(
      new Date(focusedPlan?.endTime ?? Date.now() + 1000 * 60 * 60),
    );
    return {
      startTime,
      endTime,
    };
  }, shallow);

  return (
    <Container>
      {startTime} ~ {endTime}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 48px;
`;

export default DateDisplay;
