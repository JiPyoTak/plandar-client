import { shallow } from 'zustand/shallow';

import Plan from '@/core/plan/Plan';
import useDebounce from '@/hooks/useDebounce';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';
import useSelectedPlanState from '@/stores/plan/selectedPlan';

type TReturnPlanActive = ReturnType<typeof usePlanPreviewEvent>;

const usePlanPreviewEvent = () => {
  const { focusedPlanId, isDragging, moveDragPlan } = useFocusedPlanState(
    ({ focusedPlan, isDragging, moveDragPlan }) => ({
      focusedPlanId: focusedPlan?.id,
      isDragging,
      moveDragPlan,
    }),
    shallow,
  );

  const { hoveredPlanId, clearHoveredPlan, setHoveredPlan } =
    useHoveredPlanState(
      ({ hoveredPlan, clearHoveredPlan, setHoveredPlan }) => ({
        hoveredPlanId: hoveredPlan?.id,
        clearHoveredPlan,
        setHoveredPlan,
      }),
      shallow,
    );

  const { selectedPlanId, setSelectedPlan, clearSelectedPlan } =
    useSelectedPlanState(
      ({ selectedPlan, setSelectedPlan, clearSelectedPlan }) => ({
        selectedPlanId: selectedPlan?.id,
        setSelectedPlan,
        clearSelectedPlan,
      }),
      shallow,
    );

  const [debounceToSetHoveredPlan, clearDebounce] = useDebounce(
    setHoveredPlan,
    200,
  );

  const onClick = (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => {
    if (isDragging || selectedPlanId === plan.id) return;

    const target = e.currentTarget as HTMLElement;

    setSelectedPlan({ dom: target, selectedPlan: plan });
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>, plan: Plan) => {
    if (isDragging || selectedPlanId === plan.id) return;

    const target = e.currentTarget as HTMLElement;

    debounceToSetHoveredPlan({ dom: target, hoveredPlan: plan });
  };

  const onMouseLeave = () => {
    clearHoveredPlan();
    clearDebounce();
  };

  const onMouseDown = (plan: Plan) => {
    clearHoveredPlan();
    clearSelectedPlan();
    moveDragPlan(plan);
  };

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

export type { TReturnPlanActive };
export default usePlanPreviewEvent;
