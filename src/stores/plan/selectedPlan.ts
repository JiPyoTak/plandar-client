import { create } from 'zustand';

import Plan from '@/plan/Plan';

type TRect = 'top' | 'left' | 'right' | 'bottom';

interface ISelectedPlanState {
  selectedPlan: Plan | null;
  rect: Record<TRect, number>;
}

interface ISelectedPlanAction {
  setSelectedPlan: (data: NonNullable<ISelectedPlanState>) => void;
  clearSelectedPlan: () => void;
}

const initialState: ISelectedPlanState = {
  selectedPlan: null,
  rect: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
} as const;

const useSelectedPlanState = create<ISelectedPlanState & ISelectedPlanAction>(
  (set) => ({
    ...initialState,
    setSelectedPlan: (data: NonNullable<ISelectedPlanState>) => {
      set(data);
    },
    clearSelectedPlan: () => {
      set({ selectedPlan: null });
    },
  }),
);

export default useSelectedPlanState;
