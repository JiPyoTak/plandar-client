import moment, { Moment } from 'moment';

import Plan from './Plan';
import PlanManager from './PlanManager';
import type { IViewInfo } from './PlanManager';
import { TDateYMD } from '@/stores/date';

export interface IDayViewInfo extends IViewInfo {
  id: number;
  st: Moment;
  et: Moment;
}

interface IDaysPlanManagerProps {
  plans: Plan[];
  start: TDateYMD;
  end: TDateYMD;
}

class DaysPlanManager extends PlanManager<IDayViewInfo> {
  startDate: Moment;
  endDate: Moment;
  daysIndex: number[][] = [];

  constructor({ plans, start, end }: IDaysPlanManagerProps) {
    const [currentStart, currentEnd] = [
      moment(start).startOf('d'),
      moment(end).endOf('d'),
    ];

    const filteredPlans = plans.filter((plan) => {
      const { startMoment, endMoment } = plan;
      return (
        !currentStart.isAfter(endMoment) && !currentEnd.isBefore(startMoment)
      );
    });

    super(filteredPlans);

    this.startDate = currentStart;
    this.endDate = currentEnd;
    this.viewInfo = this.getViewInfo();
  }

  getViewPlan(plan: Plan): IDayViewInfo | null {
    const { startMoment, endMoment } = plan;

    const [currentStart, currentEnd] = [this.startDate, this.endDate];

    const [viewStart, viewEnd] = [
      startMoment.isBefore(currentStart) ? currentStart.clone() : startMoment,
      endMoment.isAfter(currentEnd) ? currentEnd.clone() : endMoment,
    ];

    const term = Math.abs(viewStart.diff(viewEnd, 'd')) + 1;

    return {
      id: plan.id,
      start: viewStart.day(),
      index: 0,
      term,
      st: viewStart,
      et: viewEnd,
    };
  }

  setIndex(viewPlans: Map<Plan['id'], IDayViewInfo>) {
    const rangeTerm = Math.abs(this.startDate.diff(this.endDate, 'd')) + 1;
    const rangeIndex: number[][] = Array.from({ length: rangeTerm }, () => []);

    viewPlans.forEach((planView) => {
      let index = 0;

      const { start, term } = planView;

      for (let i = 0; i < term; i++) {
        const indexInfo = rangeIndex[start + i];

        while (indexInfo[index] !== planView.id) {
          if (!indexInfo[index]) {
            indexInfo[index] = planView.id;
            planView.index = index;
          } else {
            index++;
          }
        }
      }
    });

    this.daysIndex = rangeIndex;
  }

  getViewInfo() {
    const plans = this.sortPlans();

    const viewPlans: Map<Plan['id'], IDayViewInfo> = new Map();

    for (let i = 0; i < plans.length; i++) {
      const plan = plans[i];

      const viewPlan = this.getViewPlan(plan);

      if (!viewPlan) continue;

      viewPlans.set(plan.id, viewPlan);
    }

    this.setIndex(viewPlans);

    return viewPlans;
  }
}

export default DaysPlanManager;
