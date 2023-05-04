import PlanManager from './PlanManager';
import type { IViewInfo } from './PlanManager';

interface ITimeViewInfo extends IViewInfo {
  totalIndex: number;
}

class TimePlanManager extends PlanManager<ITimeViewInfo> {
  getViewInfo() {
    return new Map();
  }
}

export default TimePlanManager;
