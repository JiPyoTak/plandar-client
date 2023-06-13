import moment from 'moment';

import Plan from '@/plan/Plan';
import { TDateYMD } from '@/stores/date';
import { TDateYMDHM } from '@/types/time';

const isValidPlan = (plan: Plan) => {
  return plan.title && isValidDate(plan);
};

function isValidDate(startDate: TDateYMD, endDate: TDateYMD): boolean;
function isValidDate(startDate: TDateYMDHM, endDate: TDateYMDHM): boolean;
function isValidDate(plan: Plan): boolean;
function isValidDate(
  a: TDateYMD | TDateYMDHM | Plan,
  b?: TDateYMD | TDateYMDHM,
) {
  if (a instanceof Plan) {
    return moment(a._startTime).isSameOrBefore(
      a._endTime,
      a.isAllDay ? 'day' : 'minute',
    );
  } else {
    return moment(a).isSameOrBefore(b, 'minute' in a ? 'minute' : 'day');
  }
}

export { isValidPlan, isValidDate };
