import moment from 'moment';

interface ICalendarInfo {
  isToday: boolean;
  isInMonth: boolean;
  isWeekend: boolean;
  year: number;
  month: number;
  day: number;
  format: string;
}

type IProps = Pick<ICalendarInfo, 'year' | 'month' | 'day'>;

const getCalendarInfo = ({ year, month, day }: IProps) => {
  const result: ICalendarInfo[][] = [];

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
    const weeks: ICalendarInfo[] = [];

    for (let j = 0; j < 7; j++) {
      const days = today
        .clone()
        .startOf('year')
        .week(i)
        .startOf('week')
        .add(j, 'day');

      const obj: ICalendarInfo = {
        isToday: moment().isSame(days, 'day'),
        isWeekend: days.weekday() === 0 || days.weekday() === 6,
        isInMonth: days.month() === today.month(),
        year: days.year(),
        month: days.month() + 1,
        day: days.date(),
        format: days.format('YYYY-MM-DD'),
      };

      weeks.push(obj);
    }

    result.push(weeks);
  }

  return result;
};

export { getCalendarInfo };
export type { ICalendarInfo };
