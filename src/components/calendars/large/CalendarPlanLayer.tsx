import React from 'react';

import styled from '@emotion/styled';

import CalendarPlans from '@/components/calendars/large/CalendarPlans';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { IViewPlanInfo } from '@/types';

interface IProps {
  calendarPlanView?: IViewPlanInfo[][];
  selectedPlanView?: IViewPlanInfo[][];
}

const CalendarPlanLayer = ({ calendarPlanView, selectedPlanView }: IProps) => {
  const { isDragging } = useFocusedPlanState();

  return (
    <Container>
      {calendarPlanView && <CalendarPlans planViewsToWeek={calendarPlanView} />}
      {selectedPlanView && (
        <CalendarPlans
          planViewsToWeek={selectedPlanView}
          isDragging={isDragging}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 36px;
  left: 0;
  right: 0;
  z-index: 10;

  & > div {
    position: absolute;
    padding: 0 8px;
  }
`;

export default CalendarPlanLayer;
