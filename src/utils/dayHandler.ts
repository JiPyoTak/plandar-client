import moment from 'moment';

import { ICalendarInfo } from './getCalendarInfo';
import { TDateYMD } from '@/stores/date';

const compareDays = (props: TDateYMD) => {
  const { year, month, day } = props;
  const lastDay = parseInt(
    moment({ year, month: month - 1 })
      .endOf('month')
      .format('D'),
  );

  return day > lastDay ? lastDay : day;
};

// 1월 31일에서 2월 1일로 넘어갈때
// 12월 32일됨 -> 현재달의 마지막 날짜보다 큼 -> 월 증가
// - 월이 12월이고 현재 날짜가 12월의 마지막 날짜일 때 -> 년도 증가
const increaseDayComparedLastDay = (props: TDateYMD) => {
  const newState = { ...props };

  // 현재달의 마지막 날짜로 설정
  const date = moment({ year: newState.year, month: newState.month - 1 }).endOf(
    'month',
  );

  if (newState.day > date.date()) {
    if (newState.month === 12) {
      date
        .year(newState.year + 1)
        .startOf('year')
        .endOf('month');

      newState.year = newState.year + 1;
      newState.month = 1;
    } else {
      newState.month = newState.month + 1;
    }
    newState.day = newState.day - date.date();
  }

  return newState;
};

// 1월 1일에서 12월 31일로 넘어갈때
// 1월 0일됨 -> 1보다 작음 -> 월 감소
// - 월이 1월이고 현재 날짜가 1월 1일일때 -> 년도 감소
const decreaseDayComparedFirstDay = (props: TDateYMD) => {
  const newState = { ...props };

  const date = moment({ year: newState.year, month: newState.month - 1 }).endOf(
    'month',
  );

  if (newState.day < 1) {
    if (newState.month === 1) {
      date
        .year(newState.year - 1)
        .endOf('year')
        .endOf('month');

      newState.year = newState.year - 1;
      newState.month = 12;
    } else {
      date.month(newState.month - 2).endOf('month');
      newState.month = newState.month - 1;
    }

    newState.day = date.date() + newState.day;
  }

  return newState;
};

const getStartAndEndDateInMonth = (
  currentDate: ICalendarInfo[][],
): TDateYMD[] => {
  const startDate = {
    year: currentDate[0][0].year,
    month: currentDate[0][0].month - 1,
    day: currentDate[0][0].day,
  };
  const endDate = {
    year: currentDate[5][6].year,
    month: currentDate[5][6].month - 1,
    day: currentDate[5][6].day,
  };

  return [startDate, endDate];
};

export {
  compareDays,
  increaseDayComparedLastDay,
  decreaseDayComparedFirstDay,
  getStartAndEndDateInMonth,
};
