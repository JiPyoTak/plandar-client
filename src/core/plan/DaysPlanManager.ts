import moment, { Moment } from 'moment';

import Plan from './Plan';
import PlanManager from './PlanManager';
import type { IViewInfo } from './PlanManager';
import { divideTimePlansByDate } from '@/utils/plan/divideTimePlans';

export interface IDayViewInfo extends IViewInfo {
  id: number;
  st: Moment;
  et: Moment;
  termAmount: number;
}

interface IDaysPlanManagerProps {
  plans: Plan[];
  start: Moment;
  end: Moment;
}

class DaysPlanManager extends PlanManager<IDayViewInfo> {
  startDate: Moment;
  endDate: Moment;
  termAmount: number;
  daysIndex: number[][] = [];
  daysTimePlans: Plan[][];

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
    const { timePlans, allDayPlans } = divideTimePlansByDate(filteredPlans);

    super(allDayPlans);
    this.startDate = currentStart;
    this.endDate = currentEnd;
    this.termAmount = currentEnd.diff(currentStart, 'd') + 1;
    this.viewInfo = this.getViewInfo();
    this.daysTimePlans = this.setTimePlans(timePlans);
  }

  getViewPlan(plan: Plan): IDayViewInfo {
    const { startMoment, endMoment } = plan;

    const [currentStart, currentEnd] = [this.startDate, this.endDate];

    const [viewStart, viewEnd] = [
      startMoment.isBetween(currentStart, currentEnd)
        ? startMoment
        : currentStart.clone(),
      endMoment.isBetween(currentStart, currentEnd)
        ? endMoment
        : currentEnd.clone(),
    ];

    const term =
      viewEnd.clone().endOf('d').diff(viewStart.clone().startOf('d'), 'd') + 1;

    return {
      id: plan.id,
      start: viewStart.diff(currentStart, 'd'),
      index: 0,
      term,
      termAmount: this.termAmount,
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

      viewPlans.set(plan.id, viewPlan);
    }

    this.setIndex(viewPlans);

    return viewPlans;
  }

  setTimePlans(timePlans: Plan[]) {
    const format = 'YYYY-MM-DD';
    const datePlans = Array.from(Array(this.termAmount)).reduce<{
      [key: string]: Plan[];
    }>((result, _, index) => {
      const targetDate = moment(this.startDate).add(index, 'd').format(format);
      result[targetDate] = [];

      return result;
    }, {});

    timePlans.forEach((timePlan) => {
      const targetDate = timePlan.startMoment.format(format);
      if (targetDate in datePlans) datePlans[targetDate].push(timePlan);
    });

    return Object.keys(datePlans)
      .sort()
      .map((key) => datePlans[key]);
  }
}

export default DaysPlanManager;
