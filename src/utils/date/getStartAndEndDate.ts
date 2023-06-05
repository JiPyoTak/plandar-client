import moment from 'moment';

import { getFirstAndLastWeek } from './getFirstAndLastWeek';
import { TDateYMD } from '@/stores/date';

const getStartAndEndDate = ({
  year,
  month,
  day,
}: TDateYMD): [TDateYMD, TDateYMD] => {
  const [firstWeek, lastWeek] = getFirstAndLastWeek({ year, month, day });
  const date = moment({ year, month: month - 1, day });

  const startDate = date
    .clone()
    .startOf('year')
    .week(firstWeek)
    .startOf('week')
    .startOf('day');

  const endDate = date
    .clone()
    .startOf('year')
    .week(lastWeek)
    .endOf('week')
    .endOf('day');

  return [
    {
      year: startDate.year(),
      month: startDate.month(),
      day: startDate.date(),
    },
    {
      year: endDate.year(),
      month: endDate.month(),
      day: endDate.date(),
    },
  ];
};

export { getStartAndEndDate };
