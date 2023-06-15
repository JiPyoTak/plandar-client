import React, { memo, useCallback } from 'react';

import styled from '@emotion/styled';

import { shallow } from 'zustand/shallow';

import DayPlan from '@/components/plan/DayPlan';

import useDebounce from '@/hooks/useDebounce';
import DaysPlanManager from '@/plan/DaysPlanManager';
import Plan from '@/plan/Plan';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';
import useSelectedPlanState from '@/stores/plan/selectedPlan';

interface IProps {
  className?: string;
  planManager: DaysPlanManager;
}

const CalendarLayer = ({ className, planManager }: IProps) => {
  const { isDragging, focusedPlanId, moveDragPlan } = useFocusedPlanState(
    (store) => ({
      isDragging: store.isDragging,
      focusedPlanId: store.focusedPlan?.id,
      moveDragPlan: store.moveDragPlan,
    }),
    shallow,
  );

  const { hoveredPlanId, setHoveredPlan, clearHoveredPlan } =
    useHoveredPlanState((store) => {
      const [debounceToSetHoveredPlan, clearDebounce] = useDebounce(
        store.setHoveredPlan,
        200,
      );

      const clear = () => {
        clearDebounce();
        store.clearHoveredPlan();
      };

      return {
        hoveredPlanId: store.hoveredPlan?.id,
        setHoveredPlan: debounceToSetHoveredPlan,
        clearHoveredPlan: clear,
      };
    }, shallow);

  const { selectedPlanId, setSelectedPlan } = useSelectedPlanState(
    (store) => ({
      selectedPlanId: store.selectedPlan?.id,
      setSelectedPlan: store.setSelectedPlan,
    }),
    shallow,
  );

  const plans = planManager.plans;
  const viewPlans = planManager.viewInfo;

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => {
      if (isDragging || selectedPlanId === plan.id) return;

      const target = e.currentTarget as HTMLElement;

      const { top, left, right, bottom } = target.getBoundingClientRect();

      setHoveredPlan({
        hoveredPlan: plan,
        rect: { top, left, right, bottom },
      });
    },
    [isDragging, selectedPlanId, setHoveredPlan],
  );

  const onMouseDown = useCallback(
    (plan: Plan) => {
      moveDragPlan(plan);
      clearHoveredPlan();
    },
    [moveDragPlan, clearHoveredPlan],
  );

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => {
      if (isDragging || selectedPlanId === plan.id) return;

      const target = e.currentTarget as HTMLElement;

      const { top, left, right, bottom } = target.getBoundingClientRect();

      setSelectedPlan({
        selectedPlan: plan,
        rect: { top, left, right, bottom },
      });
    },
    [isDragging, selectedPlanId, setSelectedPlan],
  );

  return (
    <Container className={className}>
      {plans.map((plan, i) => {
        const viewPlan = viewPlans.get(plan.id);

        if (!viewPlan) return null;

        return (
          <DayPlan
            key={i}
            plan={plan}
            view={viewPlan}
            isSelected={focusedPlanId === plan.id || selectedPlanId === plan.id}
            isHovered={hoveredPlanId === plan.id}
            onMouseEnter={onMouseEnter}
            onMouseDown={onMouseDown}
            onMouseLeave={clearHoveredPlan}
            onClick={onClick}
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
