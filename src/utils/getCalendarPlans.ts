import moment from 'moment';

import { TDateYMD } from '@/stores/date';
import { IViewPlanInfo } from '@/types';
import { IPlan } from '@/types/rq/plan';

const getViewPlans = <T extends IPlan>(
  plan: T,
  startDate: TDateYMD,
  endDate: TDateYMD,
) => {
  const result: IViewPlanInfo[] = [];

  // 일정이 표시될 시작일을 구해야함
  const { id = -1, startTime, endTime } = plan;

  const [currentStart, currentEnd] = [
    moment(startDate).startOf('d'),
    moment(endDate).endOf('d'),
  ];

  let viewStart = moment(startTime).startOf('d');
  let viewEnd = endTime ? moment(endTime).endOf('d') : currentEnd;

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
  const weekDayAmount =
    viewEnd.clone().endOf('w').diff(viewStart.clone().startOf('w'), 'days') + 1;
  const weekAmount = Math.ceil(weekDayAmount / 7);

  const firstWeek = 0;
  const lastWeek = weekAmount - 1;

  // 주차를 돔
  for (let week = 0; week < weekAmount; week++) {
    let newViewStart = null;
    let newViewEnd = null;

    // 시작날짜의 주차와 종료날짜의 주차 비교
    if (weekAmount === 1) {
      newViewStart = viewStart;
      newViewEnd = viewEnd;
    } else {
      if (week === firstWeek) {
        // 첫주
        newViewStart = viewStart;
        newViewEnd = viewStart.clone().endOf('w');
      } else if (week === lastWeek) {
        // 마지막주
        newViewStart = viewEnd.clone().startOf('w');
        newViewEnd = viewEnd;
      } else {
        // 중간주
        newViewStart = viewStart.clone().add(week, 'w').startOf('w');
        newViewEnd = viewStart.clone().add(week, 'w').endOf('w');
      }
    }

    // 현재 달의 첫번째 주를 기준으로 몇번째 주인지
    const weekOfMonth =
      (newViewStart.clone().endOf('w').diff(currentStart, 'days') + 1) / 7 - 1;

    // 일정이 표시될 날짜의 차이
    const termInWeek =
      Math.abs(newViewEnd.clone().diff(newViewStart.clone(), 'days')) + 1;

    const currentStartTime = moment(startTime).startOf('d');
    const currentEndTime = moment(endTime).endOf('d');

    const termInMonth = Math.abs(
      currentEndTime.diff(currentStartTime.clone(), 'days'),
    );

    result.push({
      id,
      termInWeek,
      weekOfMonth,
      termInMonth,
      viewStart: newViewStart.clone(),
      viewEnd: newViewEnd.clone(),
      startTime: currentStartTime,
      endTime: currentEndTime,
      dayOfWeek: newViewStart.day() + 1,
      plan,
    });
  }

  return result;
};

const setIndexAndReturnPlanViews = (viewPlans: IViewPlanInfo[]) => {
  const planViewsToCalendar: IViewPlanInfo[][][] = Array.from(
    { length: 6 },
    () => Array.from({ length: 7 }, () => []),
  );

  viewPlans.forEach((planView) => {
    const { weekOfMonth, dayOfWeek, termInWeek } = planView;
    let index = 0;

    for (let l = 0; l < termInWeek; l++) {
      const dayInfo = planViewsToCalendar[weekOfMonth][dayOfWeek + l - 1];

      while (dayInfo[index]?.id !== planView.id) {
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

const sortPlansCallback = (a: IViewPlanInfo, b: IViewPlanInfo) => {
  return (
    a.startTime.diff(b.startTime) ||
    b.termInMonth - a.termInMonth ||
    a.id - b.id
  );
};

const getCalendarPlans = <T extends IPlan>(
  plans: T[],
  startDate: TDateYMD,
  endDate: TDateYMD,
) => {
  const planViewsArr: IViewPlanInfo[] = plans
    .map((el) => getViewPlans(el, startDate, endDate))
    .flat()
    .sort(sortPlansCallback);

  const planViewsToCalendar: IViewPlanInfo[][][] =
    setIndexAndReturnPlanViews(planViewsArr);

  return planViewsToCalendar;
};

export { getViewPlans, getCalendarPlans, setIndexAndReturnPlanViews };
