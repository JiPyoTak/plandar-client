import moment from 'moment';

import { TDateYMD } from '@/stores/date';
import { IIndexableViewPlan, IViewPlanInfo } from '@/types';
import { IPlan } from '@/types/rq/plan';

const getViewPlans = (plan: IPlan, startDate: TDateYMD, endDate: TDateYMD) => {
  const result: IViewPlanInfo[] = [];

  // 일정이 표시될 시작일을 구해야함
  const { id = -1, startTime, endTime } = plan;

  // start가 현재 달보다 작은 달일 경우 현재 달의 첫번째 주의 첫번째 날로 설정
  const [currentStart, currentEnd] = [
    moment(startDate).startOf('d'),
    moment(endDate).endOf('d'),
  ];

  let viewStart = moment(startTime).startOf('d');
  let viewEnd = moment(endTime).endOf('d');

  // 이번달에 첫번째 주의 시작 날짜보다 일정의 종료날짜가 더 빠르다면
  // 이번달에 마지막 주의 종료 날짜보다 일정의 시작날짜가 더 느리다면
  if (currentStart.isAfter(viewEnd) || currentEnd.isBefore(viewStart)) {
    return [];
  }

  // 일정의 시작날짜가 현재달의 첫번째주 첫번째 날짜보다 작다면 현재달의 첫번째주 첫번째 날짜로 설정
  if (viewStart.isBefore(currentStart)) {
    viewStart = currentStart.clone();
  }

  // 일정의 종료날짜가 현재달의 마지막주 마지막 날짜보다 크다면 현재달의 마지막주 마지막 날짜로 설정
  if (viewEnd.isAfter(currentEnd)) {
    viewEnd = currentEnd.clone();
  }

  // 항상 절대적인 날짜 차이를 반환해야함
  const weekDayDiff =
    viewEnd.clone().endOf('w').diff(viewStart.clone().startOf('w'), 'days') + 1;
  const weekDiff = Math.ceil(weekDayDiff / 7) || 1;

  // 주차를 돔
  for (let i = 0; i < weekDiff; i++) {
    let newViewStart = null;
    let newViewEnd = null;

    // 시작날짜의 주차와 종료날짜의 주차 비교
    if (weekDiff === 1) {
      newViewStart = viewStart;
      newViewEnd = viewEnd;
    } else {
      if (i === 0) {
        // 첫주
        newViewStart = viewStart;
        newViewEnd = viewStart.clone().endOf('w');
      } else if (i === weekDiff - 1) {
        // 마지막주
        newViewStart = viewEnd.clone().startOf('w');
        newViewEnd = viewEnd;
      } else {
        // 중간주
        newViewStart = viewStart.clone().add(i, 'w').startOf('w');
        newViewEnd = viewStart.clone().add(i, 'w').endOf('w');
      }
    }

    // 현재 달의 첫번째 주를 기준으로 몇번째 주인지
    const weekOfMonth =
      (newViewStart.clone().endOf('w').diff(currentStart, 'days') + 1) / 7 - 1;

    // 일정이 표시될 날짜의 차이
    const dayDiff =
      Math.abs(newViewEnd.clone().diff(newViewStart.clone(), 'days')) + 1;

    result.push({
      id,
      dayDiff,
      weekOfMonth,
      viewStart: newViewStart.clone(),
      viewEnd: newViewEnd.clone(),
      startTime: moment(startTime).startOf('d'),
      endTime: moment(endTime).endOf('d'),
      dayOfWeek: newViewStart.day() + 1,
      plan: plan.id === -1 ? null : plan,
    });
  }

  return result;
};

const sortAndReturnPlanViews = (viewPlans: IViewPlanInfo[]) => {
  const planViewsToCalendar: IIndexableViewPlan[][] = Array.from(
    { length: 6 },
    () => Array.from({ length: 7 }, () => ({})),
  );

  viewPlans.forEach((planView) => {
    const { weekOfMonth, dayOfWeek, dayDiff } = planView;
    let index = 0;

    for (let l = 0; l < dayDiff; l++) {
      const dayInfo = planViewsToCalendar[weekOfMonth][dayOfWeek + l - 1];

      while (dayInfo[index] !== planView) {
        if (!dayInfo[index]) {
          dayInfo[index] = planView;
        } else {
          index++;
        }
      }
    }
  });

  return planViewsToCalendar;
};

const getCalendarPlans = (
  plans: IPlan[],
  startDate: TDateYMD,
  endDate: TDateYMD,
) => {
  const planViewsArr: IViewPlanInfo[] = plans
    .map((el) => getViewPlans(el, startDate, endDate))
    .flat()
    .sort(
      (a, b) =>
        a.startTime.diff(b.startTime) || b.dayDiff - a.dayDiff || a.id - b.id,
    );

  const planViewsToCalendar: IIndexableViewPlan[][] =
    sortAndReturnPlanViews(planViewsArr);

  return planViewsToCalendar;
};

export { getViewPlans, getCalendarPlans, sortAndReturnPlanViews };
