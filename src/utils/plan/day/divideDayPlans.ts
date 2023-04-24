import { IPlan } from '@/types/rq/plan';

const divideDayPlans = (plans: IPlan[]) => {
  return plans.reduce(
    ({ dayPlans, allDayPlans }, plan) => {
      const { isAllDay, startTime, endTime } = plan;
      const isSameDay =
        new Date(startTime).toDateString() ===
        new Date(endTime ?? -1).toDateString();

      isAllDay || !isSameDay ? allDayPlans.push(plan) : dayPlans.push(plan);
      return { dayPlans, allDayPlans };
    },
    { dayPlans: [], allDayPlans: [] } as {
      dayPlans: IPlan[];
      allDayPlans: IPlan[];
    },
  );
};

export default divideDayPlans;
