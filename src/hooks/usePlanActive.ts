import { useCallback } from 'react';

import { shallow } from 'zustand/shallow';

import Plan from '@/core/plan/Plan';
import useDebounce from '@/hooks/useDebounce';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';
import useSelectedPlanState from '@/stores/plan/selectedPlan';

const usePlanActive = () => {
  const focusedPlanState = useFocusedPlanState(
    (store) => ({
      focusedPlanId: store.focusedPlan?.id,
      isDragging: store.isDragging,
      moveDragPlan: store.moveDragPlan,
    }),
    shallow,
  );

  const hoveredPlanState = useHoveredPlanState(
    (store) => ({
      hoveredPlanId: store.hoveredPlan?.id,
      setHoveredPlan: store.setHoveredPlan,
      clearHoveredPlan: store.clearHoveredPlan,
    }),
    shallow,
  );

  const selectedPlanState = useSelectedPlanState(
    (store) => ({
      selectedPlanId: store.selectedPlan?.id,
      setSelectedPlan: store.setSelectedPlan,
      clearSelectedPlan: store.clearSelectedPlan,
    }),
    shallow,
  );

  const { focusedPlanId, isDragging, moveDragPlan } = focusedPlanState;
  const { hoveredPlanId, setHoveredPlan, clearHoveredPlan } = hoveredPlanState;
  const { selectedPlanId, setSelectedPlan, clearSelectedPlan } =
    selectedPlanState;

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

  const onMouseLeave = useCallback(() => {
    clearDebounce();
    clearHoveredPlan();
  }, [clearHoveredPlan, clearDebounce]);

  const onMouseDown = useCallback(
    (plan: Plan) => {
      moveDragPlan(plan);
      onMouseLeave();
      clearSelectedPlan();
    },
    [moveDragPlan, onMouseLeave, clearSelectedPlan],
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

  return {
    focusedPlanId,
    hoveredPlanId,
    selectedPlanId,
    onClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
  } as const;
};

export default usePlanActive;
