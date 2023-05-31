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

  getPlanOrderArray(orderArrays: number[][], plan: Plan) {
    const [startIndex, endIndex] = [
      Math.ceil(this.getTimetableIndex(plan.startMoment)),
      Math.ceil(this.getTimetableIndex(plan.endMoment)),
    ];

    return orderArrays.slice(startIndex, endIndex);
  }

  getTimetableOrder() {
    // 24시간 * 60 / (15분 단위) = 96 칸에 대해서 순서 데이터(배열)을 가진다.
    const dayCellAmount = Math.floor(DAY_TO_MINUTE / TIMETABLE_CELL_UNIT);
    const orderArrays: number[][] = Array.from(Array(dayCellAmount), () => []);

    // 일자로 위치할 수 있는 Index를 찾아 순서 데이터를 적용한다.
    const plans = this.plans;
    for (let planIndex = 0; planIndex < plans.length; planIndex++) {
      const plan = plans[planIndex];
      const rangeOrderArrays = this.getPlanOrderArray(orderArrays, plan);

      let orderIndex = 0;
      while (orderIndex < plans.length) {
        const isCellTaken = rangeOrderArrays.some(
          (orderArray) => orderArray[orderIndex] !== undefined,
        );

        if (!isCellTaken) {
          break;
        }

        orderIndex++;
      }

      rangeOrderArrays.forEach(
        (orderArray) => (orderArray[orderIndex] = plan.id),
      );
    }

    return orderArrays;
  }

  getPlanOrderInfo(orderArrays: number[][], plan: Plan) {
    const rangeOrderArrays = this.getPlanOrderArray(orderArrays, plan);

    let index = 0;
    let totalIndex = 0;
    for (let i = 0; i < rangeOrderArrays.length; i++) {
      const orderArray = rangeOrderArrays[i];

      if (!index) {
        index = orderArray.findIndex((id) => id === plan.id) + 1;
      }

      totalIndex = Math.max(totalIndex, orderArray.length);
    }

    return { index, totalIndex };
  }

  getViewInfo() {
    const plans = this.sortPlans();
    const orderArrays = this.getTimetableOrder();
    const viewInfo = new Map<number, ITimeViewInfo>();

    plans.forEach((plan) => {
      const { index, totalIndex } = this.getPlanOrderInfo(orderArrays, plan);
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
