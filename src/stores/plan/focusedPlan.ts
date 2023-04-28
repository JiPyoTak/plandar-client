import moment from 'moment';
import { create } from 'zustand';

import { IPlan } from '@/types/rq/plan';
import { changePlanView } from '@/utils/plan/planViewHandlerToMonth';

export type IChangePlanViewType = 'create' | 'edit' | null;

type TMovePlanProps = {
  targetDate: string;
  currentDate: string;
};

interface IFocusedPlanState {
  type: IChangePlanViewType;
  // 기존 일정
  currentPlan: null | IPlan;
  // view에 반영되는 일정
  focusedPlan: null | IPlan;
  // drag 중인지 아닌지
  isDragging: boolean;
}

interface IFocusedPlanAction {
  createDragPlan: (planData: Pick<IPlan, 'startTime'> & Partial<IPlan>) => void;
  selectPlan: (plan: IPlan) => void;
  onMoveMonthPlan: (args: TMovePlanProps) => void;
  onMoveDayPlan: (args: TMovePlanProps) => void;
  onDragEndPlan: () => void;
  clearDraggedPlan: () => void;
}

const initialState = {
  type: null,
  currentPlan: null,
  focusedPlan: null,
  isDragging: false,
} as const;

const useFocusedPlanState = create<IFocusedPlanState & IFocusedPlanAction>(
  (set) => ({
    ...initialState,
    createDragPlan: (planData) => {
      const newPlan = {
        id: -1,
        title: '새로운 일정',
        description: null,
        isAllDay: false,
        type: 'task',
        endTime: null,
        color: '#52D681',
        categoryId: null,
        tags: [],
        ...planData,
      } satisfies IPlan;

      set({
        type: 'create',
        focusedPlan: newPlan,
        currentPlan: newPlan,
      });
    },
    selectPlan: (plan) => {
      set({
        type: 'edit',
        focusedPlan: { ...plan },
        currentPlan: plan,
      });
    },
    onMoveMonthPlan: ({
      targetDate: targetDateString,
      currentDate: currentDateString,
    }) => {
      set((state) => {
        const { focusedPlan, currentPlan, type } = state;
        if (!focusedPlan || !currentPlan) return state;

        const targetDate = moment(targetDateString);
        const currentDate = moment(currentDateString);

        const newPlan = changePlanView({
          targetDate,
          currentDate,
          focusedPlan,
          currentPlan,
          type,
        });

        if (!newPlan) return state;

        return { ...state, focusedPlan: newPlan, isDragging: true };
      });
    },
    onMoveDayPlan: () => set((state) => state),
    onDragEndPlan: () => {
      set((state) => {
        const { focusedPlan, currentPlan } = state;

        if (!focusedPlan) return state;

        return {
          ...initialState,
          currentPlan: focusedPlan.id === -1 ? currentPlan : null,
          focusedPlan: focusedPlan.id === -1 ? focusedPlan : null,
        };
      });
    },
    clearDraggedPlan: () => {
      set(initialState);
    },
  }),
);

export default useFocusedPlanState;
