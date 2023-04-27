import { create } from 'zustand';

import { IPlan } from '@/types/rq/plan';

type TRect = 'top' | 'left' | 'right' | 'bottom';

interface IHoveredPlanState {
  hoveredPlan: IPlan | null;
  rect: Record<TRect, number>;
}

interface IHoveredPlanAction {
  setHoveredPlan: (data: NonNullable<IHoveredPlanState>) => void;
  clearHoveredPlan: () => void;
}

const RECT = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const initialState: IHoveredPlanState = {
  hoveredPlan: null,
  rect: { ...RECT },
} as const;

const useHoveredPlanState = create<IHoveredPlanState & IHoveredPlanAction>(
  (set) => ({
    ...initialState,
    setHoveredPlan: (data: NonNullable<IHoveredPlanState>) => {
      set(data);
    },
    clearHoveredPlan: () => {
      set({ ...initialState });
    },
  }),
);

export default useHoveredPlanState;
