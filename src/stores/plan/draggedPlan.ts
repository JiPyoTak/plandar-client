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
  draggedPlan: null | IPlanWithoutIdAndTime | IPlan;
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
  clearDraggedPlan: () => void;
}

const initialState = {
  type: null,
  currentPlan: null,
  draggedPlan: null,
  isDragging: false,
} as const;

const useDraggedPlanState = create<IDraggedPlanState & IDraggedPlanAction>(
  (set) => ({
    ...initialState,
    selectPlan: (plan, type = 'create') => {
      set({
        type,
        draggedPlan: plan,
        currentPlan: plan,
      });
    },
    onMoveMonthPlan: ({
      targetDate: targetDateString,
      currentDate: currentDateString,
    }) => {
      set((state) => {
        const { draggedPlan, currentPlan, type } = state;
        if (!draggedPlan || !currentPlan) return state;

        const targetDate = moment(targetDateString);
        const currentDate = moment(currentDateString);

        const newPlan = changePlanView({
          targetDate,
          currentDate,
          draggedPlan,
          currentPlan,
          type,
        });

        if (!newPlan) return state;

        return { ...state, draggedPlan: newPlan, isDragging: true };
      });
    },
    onMoveDayPlan: () => set((state) => state),
    onDragEndPlan: () => {
      set((state) => {
        const { draggedPlan, currentPlan } = state;

        if (!draggedPlan) return state;

        return {
          ...initialState,
          currentPlan: draggedPlan.id === -1 ? currentPlan : null,
          draggedPlan: draggedPlan.id === -1 ? draggedPlan : null,
        };
      });
    },
    clearDraggedPlan: () => {
      set(initialState);
    },
  }),
);

export default useDraggedPlanState;
