import Plan from '@/core/plan/Plan';
import { theme } from '@/styles/theme';
import { IPlan } from '@/types/query/plan';

const createInitPlan = (planData: Partial<IPlan>) => {
  const newPlan = new Plan({
    id: -1,
    title: '새로운 일정',
    description: null,
    isAllDay: true,
    type: 'task',
    color: theme.primary_light,
    categoryId: null,
    tags: [],
    startTime: '',
    endTime: '',
    ...planData,
  });
  if (!planData.startTime) {
    newPlan._startTime = Date.now();
  } else {
    newPlan._startTime = newPlan.startTime;
  }
  if (!planData.endTime) {
    newPlan._endTime = Date.now() + 1000 * 60 * 30;
  } else {
    newPlan._endTime = newPlan.endTime;
  }

  return newPlan;
};

export { createInitPlan };
