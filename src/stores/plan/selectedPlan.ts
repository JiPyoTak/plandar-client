import { create } from 'zustand';

import { IPlan, IPlanWithoutIdAndTime } from '@/types/rq/plan';

interface ISelectedPlanState {
  // 기존 일정
  currentPlan: null | IPlan | IPlanWithoutIdAndTime;
  // view에 반영되는 일정
  selectedPlan: null | IPlanWithoutIdAndTime | IPlan;
  // drag 중인지 아닌지
  isDragging: boolean;
}

interface ISelectedPlanAction {
  selectPlan: (plan: IPlanWithoutIdAndTime | IPlan) => void;
  changeSelectedPlan: (cb: IChangeSelectedPlanCallback) => void;
  clearSelectedPlan: () => void;
  onDragEnd: () => void;
}

type IChangeSelectedPlanCallback = (
  ...args: any[]
) => IPlan | IPlanWithoutIdAndTime | null;

const initialState = {
  currentPlan: null,
  selectedPlan: null,
  isDragging: false,
} as const;

const useSelectedPlanState = create<ISelectedPlanState & ISelectedPlanAction>(
  (set) => ({
    ...initialState,
    selectPlan: (plan: IPlanWithoutIdAndTime | IPlan | null) => {
      console.log(plan);
      set({
        selectedPlan: plan,
        currentPlan: plan,
        isDragging: plan ? true : false,
      });
    },
    clearSelectedPlan: () => {
      set({ currentPlan: null, selectedPlan: null, isDragging: false });
    },
    changeSelectedPlan: (cb: IChangeSelectedPlanCallback) => {
      set((state) => {
        const { selectedPlan, currentPlan } = state;

        if (!selectedPlan || !currentPlan) return state;

        const newPlan = cb({ selectedPlan, currentPlan });

        if (!newPlan) return state;

        return { ...state, selectedPlan: newPlan };
      });
    },
    onDragEnd: () => {
      set((state) => {
        const { selectedPlan, currentPlan } = state;

        if (!selectedPlan) return state;

        return {
          currentPlan: selectedPlan.id === -1 ? currentPlan : null,
          selectedPlan: selectedPlan.id === -1 ? selectedPlan : null,
          isDragging: false,
        };
      });
    },
  }),
);

export default useSelectedPlanState;
