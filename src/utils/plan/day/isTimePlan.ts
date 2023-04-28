import { IPlan } from '@/types/rq/plan';

const isTimePlan = (plan: IPlan) => {
  const { isAllDay, startTime, endTime } = plan;
  const isSameDay =
    new Date(startTime).toDateString() ===
    new Date(endTime ?? -1).toDateString();

  return isAllDay || !isSameDay;
};

export { isTimePlan };
