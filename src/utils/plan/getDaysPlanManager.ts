import { Moment } from 'moment';

import DaysPlanManager from '@/core/plan/DaysPlanManager';
import Plan from '@/core/plan/Plan';
import { IPlan } from '@/types/query/plan';

const getDaysPlanManager = (plans: IPlan[], weekMoments: Moment[][]) => {
  const arr: DaysPlanManager[] = [];

  const planClass = plans
    .filter((plan) => plan.type === 'task')
    .map((plan) => new Plan(plan));

  for (let i = 0; i < weekMoments.length; i++) {
    const week = weekMoments[i];

    const viewPlans = new DaysPlanManager({
      start: week[0],
      end: week[week.length - 1],
      plans: planClass,
    });

    arr.push(viewPlans);
  }

  return arr;
};

export { getDaysPlanManager };
