import { Moment } from 'moment';

import Plan from '@/plan/Plan';

const format = 'YYYYMMDD';

const getColumnPlans = (dateMoments: Moment[], plans: Plan[]): Plan[][] => {
  const planMap = new Map<string, Plan[]>();

  for (const timePlan of plans) {
    const startDay = timePlan.startMoment.format(format);
    const startColumn = planMap.get(startDay) || [];

    startColumn.push(timePlan);
    planMap.set(startDay, startColumn);

    const endDay = timePlan.endMoment.format(format);
    if (startDay !== endDay) {
      const endColumn = planMap.get(endDay) || [];

      endColumn.push(timePlan);
      planMap.set(endDay, endColumn);
    }
  }

  const columnPlans = dateMoments.map((dateMoment) => {
    const key = dateMoment.format(format);
    return planMap.get(key) || [];
  });
  return columnPlans;
};

export default getColumnPlans;
