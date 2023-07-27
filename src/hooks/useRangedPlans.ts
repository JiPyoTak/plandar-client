import { useMemo } from 'react';

import { shallow } from 'zustand/shallow';

import { useGetPlansQuery } from '@/hooks/query/plan';
import useDateState from '@/stores/date';
import { IPlan } from '@/types/query/plan';
import { getStartAndEndDate } from '@/utils/date/getStartAndEndDate';

const useRangedPlans = (function stateMaker() {
  let plansCache: IPlan[] = [];
  let updateKeys = {};

  return function useHook() {
    const { referenceDate, referenceDateRange, calendarUnit } = useDateState(
      ({ referenceDate, referenceDateRange, calendarUnit }) => ({
        referenceDate,
        referenceDateRange,
        calendarUnit,
      }),
    );
    const [startDate, endDate] = getStartAndEndDate(referenceDate);

    const { data, ...rest } = useGetPlansQuery({
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
