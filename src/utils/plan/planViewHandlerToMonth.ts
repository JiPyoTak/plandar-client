import moment, { Moment } from 'moment';

import { compareObjects } from '../compareObjects';

import { IChangePlanViewType } from '@/stores/plan/draggedPlan';
import { IPlan, IPlanWithoutIdAndTime } from '@/types/rq/plan';

interface IBaseArgs {
  targetDate: Moment;
  currentDate: Moment;
}

interface ICreatePlanView extends IBaseArgs {
  draggedPlan: IPlanWithoutIdAndTime | IPlan;
}

interface IEditPlanView extends ICreatePlanView {
  currentPlan: IPlan | IPlanWithoutIdAndTime;
}

interface IChangePlanView extends IEditPlanView {
  type: IChangePlanViewType;
}

const changePlanView = ({
  currentDate,
  targetDate,
  draggedPlan,
  currentPlan,
  type,
}: IChangePlanView) => {
  const newPlan =
    type === 'create'
      ? createPlanView({ targetDate, currentDate, draggedPlan })
      : editPlanView({
          targetDate,
          currentDate,
          draggedPlan,
          currentPlan,
        });

  const isCompared = compareObjects(newPlan, draggedPlan);

  if (isCompared) return null;

  return newPlan;
};

const createPlanView = (props: ICreatePlanView): IPlanWithoutIdAndTime => {
  const { targetDate, currentDate, draggedPlan } = props;

  let planStart = currentDate.clone().startOf('d');
  let planEnd = currentDate.clone().endOf('d');

  if (currentDate.isAfter(targetDate)) {
    planStart = targetDate.startOf('d');
  } else if (currentDate.isBefore(targetDate)) {
    planEnd = targetDate.endOf('d');
  }

  const newPlan: IPlanWithoutIdAndTime = {
    ...draggedPlan,
    startTime: planStart.format(),
    endTime: planEnd.format(),
  };

  return newPlan;
};

const editPlanView = (props: IEditPlanView) => {
  const { targetDate, currentDate, draggedPlan, currentPlan } = props;

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

  const endTime = isNaN(termEnd)
    ? null
    : targetDate
        .clone()
        .add(termEnd, 'd')
        .hours(currentEnd.hours())
        .minutes(currentEnd.minutes());

  const newPlan = {
    ...draggedPlan,
    startTime: startTime.format(),
    endTime: endTime?.format() || null,
  };

  return newPlan;
};

export { createPlanView, editPlanView, changePlanView };
