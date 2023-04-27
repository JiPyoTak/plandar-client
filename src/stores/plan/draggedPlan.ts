import moment from 'moment';
import { create } from 'zustand';

import { IPlan, IPlanWithoutIdAndTime } from '@/types/rq/plan';
import { changePlanView } from '@/utils/plan/planViewHandlerToMonth';

export type IChangePlanViewType = 'create' | 'edit' | null;
type TMovePlanProps = {
  targetDate: string;
  currentDate: string;
};

interface IDraggedPlanState {
  type: IChangePlanViewType;
  // 기존 일정
  currentPlan: null | IPlan | IPlanWithoutIdAndTime;
  // view에 반영되는 일정
  selectedPlan: null | IPlanWithoutIdAndTime | IPlan;
  // drag 중인지 아닌지
  isDragging: boolean;
}

interface IDraggedPlanAction {
  selectPlan: (
    plan: IPlanWithoutIdAndTime | IPlan,
    type?: IChangePlanViewType,
  ) => void;
  onMoveMonthPlan: (args: TMovePlanProps) => void;
  onMoveDayPlan: (args: TMovePlanProps) => void;
  onDragEndPlan: () => void;
  clearSelectedPlan: () => void;
}

const initialState = {
  type: null,
  currentPlan: null,
  selectedPlan: null,
  isDragging: false,
} as const;

const useDraggedPlanState = create<IDraggedPlanState & IDraggedPlanAction>(
  (set) => ({
    ...initialState,
    selectPlan: (plan, type = 'create') => {
      set({
        type,
        selectedPlan: plan,
        currentPlan: plan,
      });
    },
    onMoveMonthPlan: ({
      targetDate: targetDateString,
      currentDate: currentDateString,
    }) => {
      set((state) => {
        const { selectedPlan, currentPlan, type } = state;
        if (!selectedPlan || !currentPlan) return state;

        const targetDate = moment(targetDateString);
        const currentDate = moment(currentDateString);

        const newPlan = changePlanView({
          targetDate,
          currentDate,
          selectedPlan,
          currentPlan,
          type,
        });

        if (!newPlan) return state;

        return { ...state, selectedPlan: newPlan, isDragging: true };
      });
    },
    onMoveDayPlan: () => set((state) => state),
    onDragEndPlan: () => {
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
    clearSelectedPlan: () => {
      set(initialState);
    },
  }),
);

export default useDraggedPlanState;
