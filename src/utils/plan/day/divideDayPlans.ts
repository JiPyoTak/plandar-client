import { isTimePlan } from './isTimePlan';
import { IPlan, ITimePlan } from '@/types/rq/plan';

const divideDayPlans = (plans: IPlan[]) => {
  return plans.reduce(
    ({ timePlans, allDayPlans }, plan) => {
      isTimePlan(plan)
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

export { divideDayPlans };
