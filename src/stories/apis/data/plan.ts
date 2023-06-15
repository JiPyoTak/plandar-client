import moment from 'moment';

import Plan from '@/plan/Plan';

const PLANS_DATA: Plan[] = [];

const getPlanStubs = ({
  timeMin,
  timeMax,
}: {
  timeMin: string;
  timeMax: string;
}) => {
  const st = moment(timeMin);
  const et = moment(timeMax);

  return PLANS_DATA.filter(({ startMoment, endMoment }) => {
    const isStartBetween = startMoment.isBetween(st, et, undefined, '[]');
    const isEndBetween = endMoment.isBetween(st, et, undefined, '[]');

    const isStartBefore = startMoment.isSameOrBefore(st);
    const isEndBefore = endMoment.isSameOrBefore(et);
    const isTimeBigger = isStartBefore && isEndBefore;

    return isStartBetween || isEndBetween || isTimeBigger;
  });
};

const addPlanStub = (plan: Plan) => {
  PLANS_DATA.push(plan);
};

const clearPlanStubs = () => {
  for (let i = PLANS_DATA.length; i >= 0; i--) {
    delete PLANS_DATA[i];
  }
};

export { getPlanStubs, addPlanStub, clearPlanStubs };
