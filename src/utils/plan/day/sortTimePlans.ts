import moment from 'moment';

import { ITimePlan } from '@/types/rq/plan';

const sortTimePlans = (planA: ITimePlan, planB: ITimePlan) => {
  const { id: aId, startTime: aST, endTime: aET } = planA;
  const { id: bId, startTime: bST, endTime: bET } = planB;

  const startDiff = moment(aST).diff(bST, 'minute');
  const longDiff =
    moment(bET).diff(bST, 'minute') - moment(aET).diff(aST, 'minute');
  const idDiff = aId - bId;
  return startDiff || longDiff || idDiff;
};

export { sortTimePlans };
