import { Moment } from 'moment';

import { TIMETABLE_CELL_UNIT } from '@/constants';
import Plan from '@/plan/Plan';
import { IChangePlanViewType } from '@/stores/plan/focusedPlan';

type TProps = {
  targetDate: Moment;
  currentDate: Moment;
  focusedPlan: Plan;
  currentPlan: Plan;
  type: IChangePlanViewType;
};

const getFocusedTimePlan = (props: TProps) => {
  const { type } = props;

  return type === 'create'
    ? getCreatedTimePlan(props)
    : getEditedTimePlan(props);
};

const getCreatedTimePlan = (props: TProps) => {
  const { targetDate, currentDate, focusedPlan } = props;

  let startTime = currentDate.clone();
  let endTime = targetDate.clone().add('minute', TIMETABLE_CELL_UNIT);

  if (startTime.isAfter(endTime)) {
    [startTime, endTime] = [endTime, startTime];
  }

  const plan = new Plan(focusedPlan);
  plan._startTime = startTime;
  plan._endTime = endTime;

  return plan;
};

const getEditedTimePlan = (props: TProps) => {
  const { targetDate, currentDate, focusedPlan, currentPlan } = props;

  return focusedPlan;
};

export { getFocusedTimePlan };
