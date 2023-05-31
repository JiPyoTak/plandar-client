import moment from 'moment';
import { create } from 'zustand';

import Plan from '@/plan/Plan';
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
  selectPlan: (plan: Plan) => void;
  onMoveMonthPlan: (args: TMovePlanProps) => void;
  onMoveDayPlan: (args: TMovePlanProps) => void;
  onDragEndPlan: () => void;
  clearDraggedPlan: () => void;
  createNewPlan: (planData?: Partial<IPlan>) => void;
  updateFocusedPlan: (planData: Partial<IPlan>) => void;
}

const initialState = {
  type: null,
  currentPlan: null,
  focusedPlan: null,
  isDragging: false,
} as const;

const createInitPlan = (planData: Partial<IPlan>) => {
  const newPlan = new Plan({
    id: -1,
    title: '새로운 일정',
    description: null,
    isAllDay: false,
    type: 'task',
    color: '#52D681',
    categoryId: null,
    tags: [],
    startTime: '',
    endTime: '',
    ...planData,
  });
  if (!planData.startTime) {
    newPlan._startTime = Date.now();
  }
  if (!planData.endTime) {
    newPlan._endTime = Date.now() + 1000 * 60 * 30;
  }
  return newPlan;
};

const useFocusedPlanState = create<IFocusedPlanState & IFocusedPlanAction>(
  (set, get) => ({
    ...initialState,
    createDragPlan: (planData) => {
      const newPlan = createInitPlan(planData);
      set({
        type: 'create',
        focusedPlan: newPlan,
        currentPlan: newPlan,
      });
    },
    selectPlan: (plan) => {
      set({
        type: 'edit',
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
    createNewPlan: (planData) => {
      const newPlan = createInitPlan({
        title: '',
        ...planData,
      });

      set((state) => ({
        ...state,
        type: 'create',
        focusedPlan: newPlan,
      }));
    },
    updateFocusedPlan: (planData) => {
      const focusedPlan = get().focusedPlan;
      let newPlan: Plan;
      if (!focusedPlan) {
        newPlan = createInitPlan({
          title: '',
          ...planData,
        });
      } else {
        newPlan = new Plan({
          ...focusedPlan,
          ...planData,
        });
      }

      set((state) => ({
        ...state,
        focusedPlan: newPlan,
      }));
    },
  }),
);

export default useFocusedPlanState;
