import { useMemo } from 'react';

import { shallow } from 'zustand/shallow';

import { usePlanQuery } from '@/hooks/query/plan';
import useDateState from '@/stores/date';
import { IPlan } from '@/types/query/plan';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';

const useRangedPlans = (function () {
  let plansCache: IPlan[] = [];
  let updateKeys = {};

  return function () {
    const { referenceDate, referenceDateRange, calendarUnit } = useDateState(
      ({ referenceDate, referenceDateRange, calendarUnit }) => ({
        referenceDate,
        referenceDateRange,
        calendarUnit,
      }),
    );
    const [startDate, endDate] = getStartAndEndDate(referenceDate);

    const { data, ...rest } = usePlanQuery({
      timemin: startDate.format(),
      timemax: endDate.format(),
    });

    const plans = useMemo(() => {
      const keys = {
        referenceDate,
        referenceDateRange,
        calendarUnit,
        data,
      };
      if (!shallow(keys, updateKeys)) {
        const { startMoment, endMoment } = referenceDateRange;

        plansCache =
          data?.filter(
            ({ startTime, endTime }) =>
              !(startMoment.isAfter(endTime) || endMoment.isBefore(startTime)),
          ) ?? [];
        updateKeys = keys;
      }

      return plansCache;
    }, [referenceDate, referenceDateRange, calendarUnit, data]);

    return { data: plans, ...rest };
  };
})();

export default useRangedPlans;
