import React, { memo } from 'react';

import styled from '@emotion/styled';

import DayPlan from '@/components/plan/DayPlan';

import usePlanActive from '@/hooks/usePlanActive';
import DaysPlanManager, { IDayViewInfo } from '@/plan/DaysPlanManager';

interface IProps {
  className?: string;
  planManager: DaysPlanManager;
}

const CalendarLayer = ({ className, planManager }: IProps) => {
  const [
    focusedPlanId,
    hoveredPlanId,
    selectedPlanId,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
  ] = usePlanActive();

  const plans = planManager.plans;
  const viewPlans = planManager.viewInfo;

  return (
    <Container className={className}>
      {plans.map((plan, i) => (
        <DayPlan
          key={i}
          plan={plan}
          view={viewPlans.get(plan.id) as IDayViewInfo}
          isSelected={focusedPlanId === plan.id || selectedPlanId === plan.id}
          isHovered={hoveredPlanId === plan.id}
          onMouseEnter={onMouseEnter}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
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
