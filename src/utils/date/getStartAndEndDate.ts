import moment, { Moment } from 'moment';

const getStartAndEndDate = (targetDate: Moment) => {
  const startDate = moment(targetDate)
    .startOf('month')
    .startOf('week')
    .startOf('day');
  const endDate = moment(startDate).add(5, 'week').endOf('week').endOf('day');

  return [startDate, endDate];
};

export { getStartAndEndDate };
