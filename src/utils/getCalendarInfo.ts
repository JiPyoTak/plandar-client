import moment from 'moment';

interface ICalendarInfo {
  isToday: boolean;
  isInMonth: boolean;
  isWeekend: boolean;
  year: number;
  month: number;
  day: number;
}

type IProps = Pick<ICalendarInfo, 'year' | 'month' | 'day'>;

const getCalendarInfo = ({ year, month, day }: IProps) => {
  const result: ICalendarInfo[] = [];

  const today = moment({
    year,
    month: month - 1,
    day,
  });

  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.endOf('month').week();

  const currentWeek = lastWeek + (6 - (lastWeek - firstWeek + 1));

  for (let i = firstWeek; i <= currentWeek; i++) {
    for (let j = 0; j < 7; j++) {
      const days = today
        .clone()
        .startOf('year')
        .week(i)
        .startOf('week')
        .add(j, 'day');

      const obj: ICalendarInfo = {
        isToday: false,
        isWeekend: false,
        isInMonth: true,
        year: parseInt(days.format('YYYY')),
        month: parseInt(days.format('M')),
        day: parseInt(days.format('D')),
      };

      // 오늘 일때
      if (moment().format('YYYYMMDD') === days.clone().format('YYYYMMDD')) {
        obj.isToday = true;
      }

      // 현재달에 속한 날짜가 아닐때
      if (days.clone().format('M') !== today.clone().format('M')) {
        obj.isInMonth = false;
      }

      // 주말일때
      if (days.clone().weekday() === 0 || days.clone().weekday() === 6) {
        obj.isWeekend = true;
      }

      result.push(obj);
    }
  }

  return result;
};

export { getCalendarInfo };
export type { ICalendarInfo };
