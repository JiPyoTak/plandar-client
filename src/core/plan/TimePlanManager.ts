import moment, { Moment, MomentInput } from 'moment';

import Plan from './Plan';
import PlanManager from './PlanManager';
import type { IViewInfo } from './PlanManager';
import { DAY_TO_MINUTE, TIMETABLE_CELL_UNIT } from '@/constants';

const MAX_DAY_MINUTES = 24 * 60;

export interface ITimeViewInfo extends IViewInfo {
  totalIndex: number;
}

class TimePlanManager extends PlanManager<ITimeViewInfo> {
  viewInfo: Map<number, ITimeViewInfo>;
  viewMoment: Moment;

  constructor(plans: Plan[], viewDate: MomentInput) {
    super(plans);
    this.viewMoment = moment(viewDate).startOf('day');
    this.viewInfo = this.getViewInfo();
  }

  getTimetableIndex(date: MomentInput) {
    const targetMoment = moment(date);

    let minutes = targetMoment.diff(this.viewMoment, 'minute');
    if (minutes < 0) {
      minutes = 0;
    } else if (minutes > MAX_DAY_MINUTES) {
      minutes = MAX_DAY_MINUTES;
    }

    const index = minutes / TIMETABLE_CELL_UNIT;

    return index;
  }

  // 12시 00분 일 때 문제가 된다.
  getPlanOrderArray(orderArrays: number[][], plan: Plan) {
    const [startIndex, endIndex] = [
      Math.floor(this.getTimetableIndex(plan.startMoment)),
      Math.floor(this.getTimetableIndex(plan.endMoment)) + 1,
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
