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

const DAY_MAX_MINUTE = 24 * 60;

const getCreatedTimePlan = (props: TProps) => {
  const { targetDate, currentDate, focusedPlan } = props;

  let startTime = moment(currentDate);
  let endTime = moment(targetDate);

  // startTime이 endTime보다 이후라면 (시간을 늘리는 것이라면)
  // startTime이 targetDate이여야 한다
  const isTimeAdd = startTime.isAfter(endTime);
  if (isTimeAdd) {
    [startTime, endTime] = [endTime, startTime];
  }

  // startTime과 endTime 사이의 값이 최소 15분이 보장되어야 함
  endTime.add(TIMETABLE_CELL_UNIT, 'minutes');

  // startTime과 endTime 사이의 값이 24시간을 넘으면 안됨
  const minuteDiff = Math.abs(startTime.diff(endTime, 'minutes'));
  if (minuteDiff > DAY_MAX_MINUTE) {
    // 바뀐 값도 24시간이 넘고 이전에도 24시간을 넘는다면 이전 값 Return
    const previousMinuteDiff = Math.abs(
      focusedPlan.startMoment.diff(focusedPlan.endMoment, 'minutes'),
    );
    if (previousMinuteDiff === DAY_MAX_MINUTE) {
      return focusedPlan;
    }

    if (isTimeAdd) {
      startTime = moment(endTime).add(-DAY_MAX_MINUTE, 'minutes');
    } else {
      endTime = moment(startTime).add(DAY_MAX_MINUTE, 'minutes');
    }
  }

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

export const timePlanHandlers = {
  create: getCreatedTimePlan,
  move: getMovedTimePlan,
  edit: getCreatedTimePlan,
};
