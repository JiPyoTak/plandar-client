import DaysPlanManager from '@/core/plan/DaysPlanManager';
import Plan from '@/core/plan/Plan';
import { TDateYMD } from '@/stores/date';
import { IPlan } from '@/types/query/plan';
import { ICalendarInfo } from '@/utils/calendar/getCalendarInfo';

const getYMD = <T extends TDateYMD>(date: T) => {
  return {
    year: date.year,
    month: date.month - 1,
    day: date.day,
  };
};

const getDaysPlanManager = (
  plans: IPlan[],
  calendarInfos: ICalendarInfo[][],
) => {
  const arr: DaysPlanManager[] = [];

  const planClass = plans
    .filter((plan) => plan.type === 'task')
    .map((plan) => new Plan(plan));

  for (let i = 0; i < calendarInfos.length; i++) {
    const week = calendarInfos[i];

    const firstDay = getYMD(week[0]);
    const lastDay = getYMD(week[week.length - 1]);

    const viewPlans = new DaysPlanManager({
      end: lastDay,
      start: firstDay,
      plans: planClass,
    });

    arr.push(viewPlans);
  }

  return arr;
};

export { getDaysPlanManager };
