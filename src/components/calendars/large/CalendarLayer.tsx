import React, { memo, useCallback } from 'react';

import styled from '@emotion/styled';

import { shallow } from 'zustand/shallow';

import DayPlan from '@/components/plan/DayPlan';
import DaysPlanManager from '@/plan/DaysPlanManager';
import Plan from '@/plan/Plan';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';

interface IProps {
  planManager: DaysPlanManager;
}

const CalendarLayer = ({ planManager }: IProps) => {
  const { isDragging, focusedPlanId, moveDragPlan } = useFocusedPlanState(
    (store) => ({
      isDragging: store.isDragging,
      focusedPlanId: store.focusedPlan?.id,
      moveDragPlan: store.moveDragPlan,
    }),
    shallow,
  );

  const { hoveredPlanId, setHoveredPlan, clearHoveredPlan } =
    useHoveredPlanState(
      (store) => ({
        hoveredPlanId: store.hoveredPlan?.id,
        setHoveredPlan: store.setHoveredPlan,
        clearHoveredPlan: store.clearHoveredPlan,
      }),
      shallow,
    );

  const plans = planManager.plans;
  const viewPlans = planManager.viewInfo;

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => {
      if (isDragging) return;

      const target = e.currentTarget as HTMLElement;

      const { top, left, right, bottom } = target.getBoundingClientRect();

      setHoveredPlan({
        hoveredPlan: plan,
        rect: { top, left, right, bottom },
      });
    },
    [isDragging],
  );

  const onMouseDown = useCallback((plan: Plan) => {
    moveDragPlan(plan);
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
            isSelected={focusedPlanId === plan.id}
            isHovered={hoveredPlanId === plan.id}
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
