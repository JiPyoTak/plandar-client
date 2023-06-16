import { create } from 'zustand';

import Plan from '@/plan/Plan';

type TRect = 'top' | 'left' | 'right' | 'bottom';

interface IHoveredPlanState {
  hoveredPlan: Plan | null;
  rect: Record<TRect, number>;
}

interface IHoveredPlanAction {
  setHoveredPlan: (data: NonNullable<IHoveredPlanState>) => void;
  clearHoveredPlan: () => void;
}

const initialState: IHoveredPlanState = {
  hoveredPlan: null,
  rect: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
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
