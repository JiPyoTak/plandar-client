import moment from 'moment';

import Plan from './Plan';

export interface IViewInfo {
  term: number;
  start: number;
  index: number;
}

abstract class PlanManager<T extends IViewInfo> {
  viewInfo: Map<Plan['id'], T>;

  constructor(public plans: Plan[]) {
    this.viewInfo = this.getViewInfo();
  }

  abstract getViewInfo(): Map<number, T>;
  sortPlans() {
    return this.plans.sort((planA, planB) => {
      const { id: aId, startTime: aST, endTime: aET } = planA;
      const { id: bId, startTime: bST, endTime: bET } = planB;

      const startDiff = moment(aST).diff(bST);
      const longDiff = moment(bET).diff(bST) - moment(aET).diff(aST);
      const idDiff = aId - bId;

      return startDiff || longDiff || idDiff;
    });
  }
}

export default PlanManager;
