import moment from 'moment';

import { TDateYMD } from '@/stores/date';

const getFirstAndLastWeek = ({ year, month, day }: TDateYMD) => {
  const date = moment({ year, month: month - 1, day });

  const firstWeek = date.clone().startOf('month').week();
  const lastWeek =
    date.clone().endOf('month').week() === 1 ? 53 : date.endOf('month').week();

  const currentWeek = lastWeek + (6 - (lastWeek - firstWeek + 1));

  return [firstWeek, currentWeek];
};

export { getFirstAndLastWeek };
