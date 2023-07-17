import moment, { Moment } from 'moment';

import Plan from '@/core/plan/Plan';
import { IChangePlanViewType } from '@/stores/plan/focusedPlan';
import { IPlan } from '@/types/query/plan';

interface IBaseArgs {
  targetDate: Moment;
  currentDate: Moment;
}

interface ICreatePlanView extends IBaseArgs {
  focusedPlan: IPlan;
}

interface IEditPlanView extends ICreatePlanView {
  currentPlan: IPlan;
}

interface IChangePlanView extends IEditPlanView {
  type: IChangePlanViewType;
}

const changePlanView = ({
  currentDate,
  targetDate,
  focusedPlan,
  currentPlan,
  type,
}: IChangePlanView) => {
  const newPlan =
    type === 'create'
      ? createPlanView({ targetDate, currentDate, focusedPlan })
      : editPlanView({
          targetDate,
          currentDate,
          focusedPlan,
          currentPlan,
        });

  return newPlan;
};

const createPlanView = (props: ICreatePlanView) => {
  const { targetDate, currentDate, focusedPlan } = props;

  let planStart = currentDate.clone().startOf('d');
  let planEnd = currentDate.clone().endOf('d');

  if (currentDate.isAfter(targetDate)) {
    planStart = targetDate.startOf('d');
  } else if (currentDate.isBefore(targetDate)) {
    planEnd = targetDate.endOf('d');
  }

  const newPlan = new Plan(focusedPlan);
  newPlan._startTime = planStart.format();
  newPlan._endTime = planEnd.format();

  return newPlan;
};

const editPlanView = (props: IEditPlanView) => {
  const { targetDate, currentDate, focusedPlan, currentPlan } = props;

  const currentStart = moment(currentPlan.startTime);
  const currentEnd = moment(currentPlan.endTime);

  const termStart = currentDate.endOf('d').diff(currentPlan.startTime, 'd');
  const termEnd = Math.abs(
    currentDate.startOf('d').diff(currentPlan.endTime, 'd'),
  );

  // 기존 시간을 유지해야함
  const startTime = targetDate
    .clone()
    .add(termStart * -1, 'd')
    .hours(currentStart.hours())
    .minutes(currentStart.minutes());

  const endTime = targetDate
    .clone()
    .add(termEnd, 'd')
    .hours(currentEnd.hours())
    .minutes(currentEnd.minutes());

  const newPlan = new Plan(focusedPlan);
  newPlan._startTime = startTime;
  newPlan._endTime = endTime;

  return newPlan;
};

export { createPlanView, editPlanView, changePlanView };
