import Plan from '@/core/plan/Plan';
import { IPlan } from '@/types/query/plan';

const divideTimePlans = (plans: IPlan[]) => {
  return plans.reduce(
    ({ timePlans, allDayPlans }, planData) => {
      const plan = new Plan(planData);
      plan.isTimePlan ? timePlans.push(plan) : allDayPlans.push(plan);

      return { timePlans, allDayPlans };
    },
    { timePlans: [], allDayPlans: [] } as {
      timePlans: Plan[];
      allDayPlans: Plan[];
    },
  );
};

const divideTimePlansByDate = (plans: Plan[]) => {
  return plans.reduce(
    ({ timePlans, allDayPlans }, planData) => {
      const { startMoment, endMoment } = planData;
      const isSameDate = startMoment.isSame(endMoment, 'd');

      if (isSameDate) {
        timePlans.push(planData);
      } else {
        allDayPlans.push(planData);
      }

      return { timePlans, allDayPlans };
    },
    { timePlans: [], allDayPlans: [] } as {
      timePlans: Plan[];
      allDayPlans: Plan[];
    },
  );
};

export { divideTimePlans, divideTimePlansByDate };
