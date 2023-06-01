import moment from 'moment';
import { create } from 'zustand';

import Plan from '@/plan/Plan';
import { IPlan } from '@/types/rq/plan';
import { changePlanView } from '@/utils/plan/planViewHandlerToMonth';
import { timePlanHandlers } from '@/utils/plan/timePlanHandlers';

export type IChangePlanViewType = 'create' | 'move' | 'edit' | null;

type TMovePlanProps = {
  targetDate: string;
  currentDate: string;
};

interface IFocusedPlanState {
  type: IChangePlanViewType;
  // 기존 일정
  currentPlan: null | Plan;
  // view에 반영되는 일정
  focusedPlan: null | Plan;
  // drag 중인지 아닌지
  isDragging: boolean;
}

interface IFocusedPlanAction {
  createDragPlan: (
    planData: Pick<IPlan, 'startTime' | 'endTime'> & Partial<IPlan>,
  ) => void;
  moveDragPlan: (plan: Plan) => void;
  onMoveMonthPlan: (args: TMovePlanProps) => void;
  onDragTimePlan: (args: TMovePlanProps) => void;
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
      const newPlan = new Plan({
        id: -1,
        title: '새로운 일정',
        description: null,
        isAllDay: false,
        type: 'task',
        color: '#52D681',
        categoryId: null,
        tags: [],
        ...planData,
      });

      set({
        type: 'create',
        focusedPlan: newPlan,
        currentPlan: newPlan,
      });
    },
    moveDragPlan: (plan) => {
      set({
        type: 'move',
        focusedPlan: new Plan(plan),
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

        // NOTICE : changePlanView 가 변경된 후 한 번 확인하기
        const newPlan = changePlanView({
          targetDate,
          currentDate,
          focusedPlan,
          currentPlan,
          type,
        });

        if (!newPlan) return state;

        return { ...state, focusedPlan: new Plan(newPlan), isDragging: true };
      });
    },
    onDragTimePlan: ({
      targetDate: targetDateString,
      currentDate: currentDateString,
    }) => {
      set((state) => {
        const { focusedPlan, currentPlan, type } = state;
        if (!focusedPlan || !currentPlan || !type) return state;

        const plan = timePlanHandlers[type]({
          targetDate: moment(targetDateString),
          currentDate: moment(currentDateString),
          focusedPlan,
          currentPlan,
          type,
        });

        return { ...state, focusedPlan: plan, isDragging: true };
      });
    },
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
