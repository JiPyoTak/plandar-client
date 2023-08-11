import React, { memo } from 'react';

import styled from '@emotion/styled';

import DayPlan from '@/components/common/plan/DayPlan';

import DaysPlanManager, { IDayViewInfo } from '@/core/plan/DaysPlanManager';
import { TReturnPlanActive } from '@/hooks/usePlanPreviewEvent';

interface IProps {
  className?: string;
  previewPlan: TReturnPlanActive;
  planManager: DaysPlanManager;
}

const CalendarLayer = ({ className, planManager, previewPlan }: IProps) => {
  const plans = planManager.plans;
  const viewPlans = planManager.viewInfo;

  return (
    <Container className={className}>
      {plans.map((plan, i) => (
        <DayPlan
          key={i}
          plan={plan}
          previewPlan={previewPlan}
          view={viewPlans.get(plan.id) as IDayViewInfo}
        />
      ))}
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

export default memo(CalendarLayer);
