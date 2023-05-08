import Plan from './Plan';
import PlanManager from './PlanManager';
import type { IViewInfo } from './PlanManager';
import { DAY_TO_MINUTE, TIMETABLE_CELL_UNIT } from '@/constants';

interface ITimeViewInfo extends IViewInfo {
  totalIndex: number;
}

class TimePlanManager extends PlanManager<ITimeViewInfo> {
  getPlanIndex(plan: Plan) {
    const startDate = new Date(plan.startTime);
    const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
    const startIndex = Math.ceil(startMinutes / TIMETABLE_CELL_UNIT);

    const endDate = new Date(plan.endTime);
    const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
    const endIndex = Math.ceil(endMinutes / TIMETABLE_CELL_UNIT);

    return [startIndex, endIndex];
  }

  getViewInfo() {
    // 24시간 * 60 / (15분 단위) = 96 칸에 대해서 순서 데이터(배열)을 가진다.
    const dayCellAmount = Math.floor(DAY_TO_MINUTE / TIMETABLE_CELL_UNIT);
    const orderArrays: number[][] = Array.from(Array(dayCellAmount), () => []);

    // 플랜을 정렬한 뒤
    const plans = this.sortPlans();

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

    // View Info 값을 Map에 지정하기
    const viewInfos = new Map<number, ITimeViewInfo>();
    plans.forEach((plan, planIndex) => {
      const [startIndex, endIndex] = this.getPlanIndex(plan);
      const rangeOrderArrays = orderArrays.slice(startIndex, endIndex);

      const index =
        rangeOrderArrays[0].findIndex((index) => index === planIndex) + 1;
      const totalIndex = rangeOrderArrays.reduce(
        (total, orderArray) => Math.max(total, orderArray.length),
        0,
      );

      viewInfos.set(plan.id, {
        term: endIndex - startIndex,
        start: startIndex,
        index,
        totalIndex,
      });
    });

    return viewInfos;
  }
}

export default TimePlanManager;
