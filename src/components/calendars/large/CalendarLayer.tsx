import React, { memo, useCallback } from 'react';

import styled from '@emotion/styled';

import { shallow } from 'zustand/shallow';

import DayPlan from '@/components/plan/DayPlan';

import useDebounce from '@/hooks/useDebounce';
import DaysPlanManager, { IDayViewInfo } from '@/plan/DaysPlanManager';
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
    useHoveredPlanState(
      (store) => ({
        hoveredPlanId: store.hoveredPlan?.id,
        setHoveredPlan: store.setHoveredPlan,
        clearHoveredPlan: store.clearHoveredPlan,
      }),
      shallow,
    );

  const { selectedPlanId, setSelectedPlan } = useSelectedPlanState(
    (store) => ({
      selectedPlanId: store.selectedPlan?.id,
      setSelectedPlan: store.setSelectedPlan,
    }),
    shallow,
  );

  const plans = planManager.plans;
  const viewPlans = planManager.viewInfo;

  const [debounceToSetHoveredPlan, clearDebounce] = useDebounce(
    setHoveredPlan,
    200,
  );

  const onMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => {
      if (isDragging || selectedPlanId === plan.id) return;

      const target = e.currentTarget as HTMLElement;

      const { top, left, right, bottom } = target.getBoundingClientRect();

      debounceToSetHoveredPlan({
        hoveredPlan: plan,
        rect: { top, left, right, bottom },
      });
    },
    [isDragging, selectedPlanId, debounceToSetHoveredPlan],
  );

  const clear = useCallback(() => {
    clearDebounce();
    clearHoveredPlan();
  }, [clearHoveredPlan]);

  const onMouseDown = useCallback(
    (plan: Plan) => {
      moveDragPlan(plan);
      clear();
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

  const filteredPlan = plans.filter((plan) => viewPlans.get(plan.id));

  return (
    <Container className={className}>
      {filteredPlan.map((plan, i) => (
        <DayPlan
          key={i}
          plan={plan}
          view={viewPlans.get(plan.id) as IDayViewInfo}
          isSelected={focusedPlanId === plan.id || selectedPlanId === plan.id}
          isHovered={hoveredPlanId === plan.id}
          onMouseEnter={onMouseEnter}
          onMouseDown={onMouseDown}
          onMouseLeave={clear}
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
