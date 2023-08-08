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

    // *: startDay랑 날짜가 다른데 endDay가 00:00:00
    /// -> 해당 timetable column에 추가할 필요가 없다.
    const endDay = timePlan.endMoment.format(DATE_FORMAT);
    if (
      startDay !== endDay &&
      timePlan.endMoment.format('HH:mm:ss') !== '00:00:00'
    ) {
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
