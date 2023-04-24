import moment, { Moment } from 'moment';

import { compareObjects } from '../compareObjects';

import { IPlan, IPlanWithoutIdAndTime } from '@/types/rq/plan';

interface IBaseArgs {
  targetDate: Moment;
  currentDate: Moment;
}

interface ICreatePlanView extends IBaseArgs {
  selectedPlan: IPlanWithoutIdAndTime | IPlan;
}

interface IEditPlanView extends ICreatePlanView {
  currentPlan: IPlan | IPlanWithoutIdAndTime;
}

const changePlanView =
  ({ currentDate, targetDate }: IBaseArgs) =>
  ({ selectedPlan, currentPlan }: IEditPlanView) => {
    const newPlan =
      selectedPlan.id === -1
        ? createPlanView({ targetDate, currentDate, selectedPlan })
        : editPlanView({
            targetDate,
            currentDate,
            selectedPlan,
            currentPlan,
          });

    const isCompared = compareObjects(newPlan, selectedPlan);

    if (isCompared) return null;

    return newPlan;
  };

const createPlanView = (props: ICreatePlanView): IPlanWithoutIdAndTime => {
  const { targetDate, currentDate, selectedPlan } = props;

  let planStart = currentDate.clone().startOf('d');
  let planEnd = currentDate.clone().endOf('d');

  if (currentDate.isAfter(targetDate)) {
    planStart = targetDate.startOf('d');
  } else if (currentDate.isBefore(targetDate)) {
    planEnd = targetDate.endOf('d');
  }

  const newPlan: IPlanWithoutIdAndTime = {
    ...selectedPlan,
    startTime: planStart.format(),
    endTime: planEnd.format(),
  };

  return newPlan;
};

const editPlanView = (props: IEditPlanView) => {
  const { targetDate, currentDate, selectedPlan, currentPlan } = props;

  const currentStart = moment(currentPlan.startTime).utc();
  const currentEnd = moment(currentPlan.endTime).utc();

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

  return {
    ...selectedPlan,
    startTime: startTime.format(),
    endTime: endTime.format(),
  };
};

export { createPlanView, editPlanView, changePlanView };