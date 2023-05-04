import PlanManager from './PlanManager';
import type { IViewInfo } from './PlanManager';

interface IWeekViewInfo extends IViewInfo {
  end: number;
}

class WeekPlanManager extends PlanManager<IWeekViewInfo> {
  getViewInfo() {
    return new Map();
  }
}

export default WeekPlanManager;
