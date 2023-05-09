import moment from 'moment';

import { IPlan } from '@/types/rq/plan';

const sortPlans = (planA: IPlan, planB: IPlan) => {
  const { id: aId, startTime: aST, endTime: aET } = planA;
  const { id: bId, startTime: bST, endTime: bET } = planB;

  // 먼저 시작하는 일정이 먼저 와야한다.
  const startDiff = moment(aST).diff(bST, 'minute');

  // 가장 긴 일정이 먼저 와야한다.
  let longDiff = 0;
  if (aET && bET) {
    longDiff =
      moment(bET).diff(bST, 'minute') - moment(aET).diff(aST, 'minute');
  }
  //// 한 일정의 끝나는 일정이 없으면 하루보다 짧은지 긴지 비교한다.
  else if (aET && !bET) {
    longDiff = moment(aET).diff(aST, 'day') < 0 ? 1 : -1;
  } else if (!aET && bET) {
    longDiff = moment(bET).diff(bST, 'day') < 0 ? -1 : 1;
  }
  const idDiff = aId - bId;
  return startDiff || longDiff || idDiff;
};

export { sortPlans };
