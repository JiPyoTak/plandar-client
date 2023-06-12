import moment from 'moment';

import { shallow } from 'zustand/shallow';

import { TDateYMD } from '@/stores/date';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { TDateType, TDateYMDHM, TTimeHM } from '@/types/time';

const usePlanDateState = () =>
  useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;

      const _startDate = focusedPlan?.startTime
        ? new Date(focusedPlan?.startTime)
        : new Date();

      const startDate = {
        year: _startDate.getFullYear(),
        month: _startDate.getMonth() + 1,
        day: _startDate.getDate(),
        hour: _startDate.getHours(),
        minute: _startDate.getMinutes(),
      };

      const _endDate = focusedPlan?.endTime
        ? new Date(focusedPlan?.endTime)
        : new Date();

      const endDate = {
        year: _endDate.getFullYear(),
        month: _endDate.getMonth() + 1,
        day: _endDate.getDate(),
        hour: _endDate.getHours(),
        minute: _endDate.getMinutes(),
      };

      const date: { [key in TDateType]: TDateYMDHM } = {
        start: startDate,
        end: endDate,
      };

      const isValidEndDate = moment({
        ...startDate,
        month: startDate.month - 1,
      }).isSameOrBefore({ ...endDate, month: endDate.month - 1 });

      const setDate = (type: TDateType) => {
        const key = type === 'start' ? 'startTime' : 'endTime';
        const originDate = date[type];
        return ({ year, month, day }: TDateYMD) => {
          const newDateMoment = moment({
            ...originDate,
            year,
            month: month - 1,
            day,
          });
          updateFocusedPlan({ [key]: newDateMoment.toString() });
        };
      };

      const setTime = (type: TDateType) => {
        const key = type === 'start' ? 'startTime' : 'endTime';
        const originDate = date[type];
        return ({ hour, minute }: TTimeHM) => {
          const { month, ...rest } = originDate;
          const newDateMoment = moment({
            ...rest,
            month: month - 1,
            hour,
            minute,
          });
          updateFocusedPlan({ [key]: newDateMoment.toString() });
        };
      };

      return {
        date,
        isValidEndDate,
        isAllDay: focusedPlan?.isAllDay,
        setDate,
        setTime,
      };
    },
    (prev, cur) => {
      return shallow(prev.date, cur.date) && prev.isAllDay === cur.isAllDay;
    },
  );

export default usePlanDateState;
