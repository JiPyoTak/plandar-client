import { sortTimePlans } from './sortTimePlans';
import { DAY_TO_MINUTE, TIMETABLE_CELL_UNIT } from '@/constants';
import { ITimePlan } from '@/types/rq/plan';

const dateToTimetableMinute = (
  dateString: string,
  rounderName: 'ceil' | 'floor' = 'floor',
) => {
  const date = new Date(dateString);
  const dayMinutes = date.getHours() * 60 + date.getMinutes();
  const rounder = Math?.[rounderName ? 'ceil' : 'floor'];

  return rounder(dayMinutes / TIMETABLE_CELL_UNIT);
};

const getOrderInfoOfTimePlans = (plans: ITimePlan[]) => {
  const dayCellAmount = Math.floor(DAY_TO_MINUTE / TIMETABLE_CELL_UNIT);
  const orderArrays: number[][] = Array.from(Array(dayCellAmount), () => []);

  plans.sort(sortTimePlans);

  for (let planIndex = 0; planIndex < plans.length; planIndex++) {
    const plan = plans[planIndex];

    const startIndex = dateToTimetableMinute(plan.startTime);
    const endIndex = dateToTimetableMinute(plan.endTime, 'ceil');
    const rangeOrderArrays = orderArrays.slice(startIndex, endIndex);

    let orderIndex = 0;
    while (orderIndex < plans.length) {
      const hasSpace = rangeOrderArrays.every(
        (orderArray) => orderArray[orderIndex] === undefined,
      );

      if (hasSpace) {
        break;
      }

      orderIndex++;
    }

    rangeOrderArrays.forEach(
      (orderArray) => (orderArray[orderIndex] = planIndex),
    );
  }

  return plans.map((plan, planIndex) => {
    const startIndex = dateToTimetableMinute(plan.startTime);
    const endIndex = dateToTimetableMinute(plan.endTime, 'ceil');
    const rangeOrderArrays = orderArrays.slice(startIndex, endIndex);

    const rank =
      rangeOrderArrays[0].findIndex((index) => index === planIndex) + 1;
    const total = rangeOrderArrays.reduce(
      (total, orderArray) => Math.max(total, orderArray.length),
      0,
    );
    return { rank, total };
  });
};

export { getOrderInfoOfTimePlans };
