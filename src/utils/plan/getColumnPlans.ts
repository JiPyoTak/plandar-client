import { Moment } from 'moment';

import { DATE_FORMAT } from '@/constants';
import Plan from '@/core/plan/Plan';

const getColumnPlans = (dateMoments: Moment[], plans: Plan[]): Plan[][] => {
  const planMap = new Map<string, Plan[]>();

  for (const timePlan of plans) {
    const startDay = timePlan.startMoment.format(DATE_FORMAT);
    const startColumn = planMap.get(startDay) || [];

    startColumn.push(timePlan);
    planMap.set(startDay, startColumn);

    const endDay = timePlan.endMoment.format(DATE_FORMAT);
    if (startDay !== endDay) {
      const endColumn = planMap.get(endDay) || [];

      endColumn.push(timePlan);
      planMap.set(endDay, endColumn);
    }
  }

  const columnPlans = dateMoments.map((dateMoment) => {
    const key = dateMoment.format(DATE_FORMAT);

    return planMap.get(key) || [];
  });

  return columnPlans;
};

export default getColumnPlans;
