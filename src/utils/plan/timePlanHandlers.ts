import moment, { Moment } from 'moment';

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

const getCreatedTimePlan = (props: TProps) => {
  const { targetDate, currentDate, focusedPlan } = props;

  let startTime = moment(currentDate);
  let endTime = moment(targetDate);

  if (startTime.isAfter(endTime)) {
    [startTime, endTime] = [endTime, startTime];
  }
  endTime.add(TIMETABLE_CELL_UNIT, 'minutes');

  const plan = new Plan(focusedPlan);
  plan._startTime = startTime;
  plan._endTime = endTime;

  return plan;
};

const getMovedTimePlan = (props: TProps) => {
  const { targetDate, currentDate, focusedPlan, currentPlan } = props;

  const minuteDiff = moment(targetDate).diff(currentDate, 'minute');

  const plan = new Plan(focusedPlan);
  plan._startTime = currentPlan.startMoment.add(minuteDiff, 'minutes');
  plan._endTime = currentPlan.endMoment.add(minuteDiff, 'minutes');

  return plan;
};

const getEditedTimePlan = (props: TProps) => {
  const { targetDate, currentDate, focusedPlan, currentPlan } = props;

  const minuteDiff = moment(targetDate).diff(currentDate, 'minute');

  const plan = new Plan(focusedPlan);
  plan._startTime = currentPlan.startMoment.add(minuteDiff, 'minutes');
  plan._endTime = currentPlan.endMoment.add(minuteDiff, 'minutes');

  return plan;
};

export const timePlanHandlers = {
  create: getCreatedTimePlan,
  move: getMovedTimePlan,
  edit: getEditedTimePlan,
};
