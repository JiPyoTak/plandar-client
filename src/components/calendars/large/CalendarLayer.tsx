import React from 'react';

import styled from '@emotion/styled';

import PlanViewInMonth from '@/components/plan/month';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import { IViewPlanInfo } from '@/types';

interface IProps {
  calendarPlanView?: IViewPlanInfo[][];
  selectedPlanView?: IViewPlanInfo[][];
}

const CalendarLayer = ({ calendarPlanView, selectedPlanView }: IProps) => {
  const { isDragging } = useSelectedPlanState();

  return (
    <Layer>
      {calendarPlanView && (
        <PlanViewInMonth planViewsToWeek={calendarPlanView} />
      )}
      {selectedPlanView && (
        <PlanViewInMonth
          planViewsToWeek={selectedPlanView}
          isDragging={isDragging}
        />
      )}
    </Layer>
  );
};

const Layer = styled.div`
  position: absolute;
  top: 36px;
  left: 0;
  right: 0;
  z-index: 100;

  & > div {
    position: absolute;
    padding: 0 8px;
  }
`;

export default CalendarLayer;
