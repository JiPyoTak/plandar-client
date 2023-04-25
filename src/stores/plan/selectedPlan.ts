import { create } from 'zustand';

import { IPlan, IPlanWithoutIdAndTime } from '@/types/rq/plan';

export type IChangePlanViewType = 'create' | 'edit' | null;

interface ISelectedPlanState {
  type: IChangePlanViewType;
  // 기존 일정
  currentPlan: null | IPlan | IPlanWithoutIdAndTime;
  // view에 반영되는 일정
  selectedPlan: null | IPlanWithoutIdAndTime | IPlan;
  // drag 중인지 아닌지
  isDragging: boolean;
}

interface ISelectedPlanAction {
  selectPlan: (
    plan: IPlanWithoutIdAndTime | IPlan,
    type?: IChangePlanViewType,
  ) => void;
  changeSelectedPlan: (cb: IChangeSelectedPlanCallback) => void;
  clearSelectedPlan: () => void;
  onDragEnd: () => void;
}

type IChangeSelectedPlanCallback = (
  ...args: any[]
) => IPlan | IPlanWithoutIdAndTime | null;

const initialState = {
  type: null,
  currentPlan: null,
  selectedPlan: null,
  isDragging: false,
} as const;

const useSelectedPlanState = create<ISelectedPlanState & ISelectedPlanAction>(
  (set) => ({
    ...initialState,
    selectPlan: (plan, type = 'create') => {
      set({
        type,
        selectedPlan: plan,
        currentPlan: plan,
      });
    },
    clearSelectedPlan: () => {
      set(initialState);
    },
    changeSelectedPlan: (cb) => {
      set((state) => {
        const { selectedPlan, currentPlan } = state;

        if (!selectedPlan || !currentPlan) return state;

        const newPlan = cb({ selectedPlan, currentPlan, type: state.type });

        if (!newPlan) return state;

        return { ...state, selectedPlan: newPlan, isDragging: true };
      });
    },
    onDragEnd: () => {
      set((state) => {
        const { selectedPlan, currentPlan } = state;

        if (!selectedPlan) return state;

        return {
          ...initialState,
          currentPlan: selectedPlan.id === -1 ? currentPlan : null,
          selectedPlan: selectedPlan.id === -1 ? selectedPlan : null,
        };
      });
    },
  }),
);

export default useSelectedPlanState;
