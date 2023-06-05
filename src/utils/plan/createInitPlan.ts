import Plan from '@/plan/Plan';
import { IPlan } from '@/types/rq/plan';

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

export { createInitPlan };
