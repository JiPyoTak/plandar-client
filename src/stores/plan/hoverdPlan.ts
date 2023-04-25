import { create } from 'zustand';

interface IHoveredPlanState {
  hoveredPlanId: number | null;
}

interface IHoveredPlanAction {
  setHoveredPlanId: (planId: number) => void;
  clearHoveredPlanId: () => void;
}

const initialState = {
  hoveredPlanId: null,
} as const;

const useHoveredPlanIdState = create<IHoveredPlanState & IHoveredPlanAction>(
  (set) => ({
    ...initialState,
    setHoveredPlanId: (planId: number) => {
      set({ hoveredPlanId: planId });
    },
    clearHoveredPlanId: () => {
      set({ hoveredPlanId: null });
    },
  }),
);

export default useHoveredPlanIdState;
