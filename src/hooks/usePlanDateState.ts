import moment from 'moment';

import { shallow } from 'zustand/shallow';

import { toast } from '@/core/toast';
import { TDateYMD } from '@/stores/date';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { TDateType, TDateYMDHM, TTimeHM } from '@/types/time';
import { isValidDate } from '@/utils/plan/isValidPlan';

const usePlanDateState = () => {
  return useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;

      // 시작 날짜 및 시각
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

      // 종료 날짜 및 시각
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

      const checkValidDate = (type: TDateType, newDate: TDateYMDHM) => {
        const prev = date[type === 'start' ? 'end' : 'start'];
        const oppositeDate = {
          ...prev,
          month: prev.month - 1,
        };

        const start = type === 'start' ? newDate : oppositeDate;
        const end = type === 'end' ? newDate : oppositeDate;

        return isValidDate(start, end);
      };

      const setDate = (type: TDateType) => {
        const key = type === 'start' ? 'startTime' : 'endTime';
        const originDate = date[type];

        return ({ year, month, day }: TDateYMD) => {
          const newDate = {
            ...originDate,
            year,
            month: month - 1,
            day,
          };

          const isValid = checkValidDate(type, newDate);

          if (!isValid) {
            toast('날짜를 변경할 수 없습니다.');
          } else {
            const newDateMoment = moment(newDate);

            updateFocusedPlan({ [key]: newDateMoment.toString() });
          }

          return isValid;
        };
      };

      const setTime = (type: TDateType) => {
        const key = type === 'start' ? 'startTime' : 'endTime';
        const originDate = date[type];

        return ({ hour, minute }: TTimeHM) => {
          const { month, ...rest } = originDate;

          const newDate = {
            ...rest,
            month: month - 1,
            hour,
            minute,
          };

          const isValid = checkValidDate(type, newDate);

          if (!isValid) {
            toast('날짜를 변경할 수 없습니다.');
          } else {
            const newDateMoment = moment(newDate);

            updateFocusedPlan({ [key]: newDateMoment.toString() });
          }

          return isValid;
        };
      };

      return {
        date,
        isAllDay: focusedPlan?.isAllDay,
        setDate,
        setTime,
      };
    },
    (prev, cur) => {
      return shallow(prev.date, cur.date) && prev.isAllDay === cur.isAllDay;
    },
  );
};

export default usePlanDateState;
