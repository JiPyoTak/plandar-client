import { create } from 'zustand';

import Plan from '@/core/plan/Plan';

interface IHoveredPlanState {
  dom: HTMLElement | null;
  hoveredPlan: Plan | null;
}

interface IHoveredPlanAction {
  setHoveredPlan: (data: NonNullable<IHoveredPlanState>) => void;
  clearHoveredPlan: () => void;
}

const initialState: IHoveredPlanState = {
  dom: null,
  hoveredPlan: null,
} as const;

const useHoveredPlanState = create<IHoveredPlanState & IHoveredPlanAction>(
  (set) => ({
    ...initialState,
    setHoveredPlan: (data: NonNullable<IHoveredPlanState>) => {
      set(data);
    },
    clearHoveredPlan: () => {
      set({ hoveredPlan: null });
    },
  }),
);

export default useHoveredPlanState;
