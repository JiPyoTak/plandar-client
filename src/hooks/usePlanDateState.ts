import moment from 'moment';

import { shallow } from 'zustand/shallow';

import { TDateYMD } from '@/stores/date';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { TDateType, TDateYMDHM, TTimeHM } from '@/types/time';
import { isValidDate } from '@/utils/plan/isValidPlan';

const usePlanDateState = () =>
  useFocusedPlanState(
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

      // 날짜 및 시간 유효성 검사
      let startDateForCompare: TDateYMD | TDateYMDHM = {
        year: startDate.year,
        month: startDate.month - 1,
        day: startDate.day,
      };
      let endDateForCompare: TDateYMD | TDateYMDHM = {
        year: endDate.year,
        month: endDate.month - 1,
        day: endDate.day,
      };
      if (!focusedPlan?.isAllDay) {
        startDateForCompare = {
          ...startDateForCompare,
          hour: startDate.hour,
          minute: startDate.minute,
        };
        endDateForCompare = {
          ...endDateForCompare,
          hour: endDate.hour,
          minute: endDate.minute,
        };
      }
      const isValidEndDate = isValidDate(
        startDateForCompare,
        endDateForCompare,
      );

      // focusedPlan의 startDate, endDate 업데이트
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
