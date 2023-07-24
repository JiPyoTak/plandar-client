import moment, { Moment } from 'moment';

const CALENDAR_WEEK_COUNT = 6;
const WEEK_DAY_COUNT = 7;

const getDayMoments = (
  referenceDate: Moment,
  dayAmount: number = CALENDAR_WEEK_COUNT * WEEK_DAY_COUNT,
) => {
  const result: Moment[] = [];
  const startOfMonth = moment(referenceDate).startOf('month').startOf('week');

  for (let day = 0; day < dayAmount; day++) {
    const targetDay = moment(startOfMonth).add(day, 'day');
    result.push(targetDay);
  }

  return result;
};

export { getDayMoments };
