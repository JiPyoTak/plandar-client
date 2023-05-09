import { MomentInput } from 'moment';

import Plan from './Plan';
import PlanManager from './PlanManager';
import type { IViewInfo } from './PlanManager';
import { DAY_TO_MINUTE, TIMETABLE_CELL_UNIT } from '@/constants';
import { getTimeMinute } from '@/utils/date/getTimeMinute';

export interface ITimeViewInfo extends IViewInfo {
  totalIndex: number;
}

class TimePlanManager extends PlanManager<ITimeViewInfo> {
  viewInfo: Map<number, ITimeViewInfo>;

  constructor(plans: Plan[]) {
    super(plans);
    this.viewInfo = this.getViewInfo();
  }

  getTimetableIndex(date: MomentInput) {
    const minutes = getTimeMinute(date);
    const index = minutes / TIMETABLE_CELL_UNIT;

    return index;
  }

  getPlanIndex(plan: Plan) {
    return [
      Math.ceil(this.getTimetableIndex(plan.startMoment)),
      Math.ceil(this.getTimetableIndex(plan.endMoment)),
    ];
  }

  getTimetableOrder() {
    const plans = this.plans;
    // 24시간 * 60 / (15분 단위) = 96 칸에 대해서 순서 데이터(배열)을 가진다.
    const dayCellAmount = Math.floor(DAY_TO_MINUTE / TIMETABLE_CELL_UNIT);
    const orderArrays: number[][] = Array.from(Array(dayCellAmount), () => []);

    // 일자로 위치할 수 있는 Index를 찾아 순서 데이터를 적용한다.
    for (let planIndex = 0; planIndex < plans.length; planIndex++) {
      const plan = plans[planIndex];

      const [startIndex, endIndex] = this.getPlanIndex(plan);
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

    return orderArrays;
  }

  getViewInfo() {
    const plans = this.sortPlans();
    const orderArrays = this.getTimetableOrder();
    const viewInfo = new Map<number, ITimeViewInfo>();

    plans.forEach((plan, planIndex) => {
      const [startIndex, endIndex] = this.getPlanIndex(plan);
      const rangeOrderArrays = orderArrays.slice(startIndex, endIndex);

      const index =
        rangeOrderArrays[0].findIndex((index) => index === planIndex) + 1;
      const totalIndex = rangeOrderArrays.reduce(
        (total, orderArray) => Math.max(total, orderArray.length),
        0,
      );

      const start = this.getTimetableIndex(plan.startMoment);
      const end = this.getTimetableIndex(plan.endMoment);
      const term = end - start;

      viewInfo.set(plan.id, {
        term,
        start,
        index,
        totalIndex,
      });
    });

    return viewInfo;
  }
}

export default TimePlanManager;
