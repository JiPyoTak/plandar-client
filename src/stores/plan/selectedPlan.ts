import { create } from 'zustand';

import Plan from '@/core/plan/Plan';

interface ISelectedPlanState {
  dom: HTMLElement | null;
  selectedPlan: Plan | null;
}

interface ISelectedPlanAction {
  setSelectedPlan: (data: NonNullable<ISelectedPlanState>) => void;
  clearSelectedPlan: () => void;
}

const initialState: ISelectedPlanState = {
  dom: null,
  selectedPlan: null,
} as const;

const useSelectedPlanState = create<ISelectedPlanState & ISelectedPlanAction>(
  (set) => ({
    ...initialState,
    setSelectedPlan: (data: ISelectedPlanState) => {
      set(data);
    },
    clearSelectedPlan: () => {
      set({ selectedPlan: null });
    },
  }),
);

export default useSelectedPlanState;
