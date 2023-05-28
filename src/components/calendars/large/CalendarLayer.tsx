import React, { memo, useCallback } from 'react';

import styled from '@emotion/styled';

import DayPlan from '@/components/plan/DayPlan';
import DaysPlanManager from '@/plan/DaysPlanManager';
import Plan from '@/plan/Plan';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';

interface IProps {
  planManager: DaysPlanManager;
}

const CalendarLayer = ({ planManager }: IProps) => {
  const { focusedPlan, selectPlan } = useFocusedPlanState();
  const { hoveredPlan, setHoveredPlan, clearHoveredPlan } =
    useHoveredPlanState();

  const plans = planManager.plans;
  const viewPlans = planManager.viewInfo;

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => {
      if (focusedPlan) return;

      const target = e.currentTarget as HTMLElement;

      const { top, left, right, bottom } = target.getBoundingClientRect();

      setHoveredPlan({
        hoveredPlan: plan,
        rect: { top, left, right, bottom },
      });
    },
    [focusedPlan?.id],
  );

  const onMouseDown = useCallback((plan: Plan) => {
    selectPlan(plan);
    clearHoveredPlan();
  }, []);

  return (
    <Container>
      {plans.map((plan, i) => {
        const viewPlan = viewPlans.get(plan.id);

        if (!viewPlan) return null;

        return (
          <DayPlan
            key={i}
            plan={plan}
            view={viewPlan}
            isSelected={focusedPlan?.id === plan.id}
            isHovered={hoveredPlan?.id === plan.id}
            onMouseEnter={onMouseEnter}
            onMouseDown={onMouseDown}
            onMouseLeave={clearHoveredPlan}
          />
        );
      })}
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
