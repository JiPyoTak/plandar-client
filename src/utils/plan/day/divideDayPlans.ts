import { IPlan, ITimePlan } from '@/types/rq/plan';

const divideDayPlans = (plans: IPlan[]) => {
  return plans.reduce(
    ({ timePlans, allDayPlans }, plan) => {
      const { isAllDay, startTime, endTime } = plan;
      const isSameDay =
        new Date(startTime).toDateString() ===
        new Date(endTime ?? -1).toDateString();

      isAllDay || !isSameDay
        ? allDayPlans.push(plan)
        : timePlans.push(plan as ITimePlan);
      return { timePlans, allDayPlans };
    },
    { timePlans: [], allDayPlans: [] } as {
      timePlans: ITimePlan[];
      allDayPlans: IPlan[];
    },
  );
};

export default divideDayPlans;
