import moment from 'moment';

import { TDateYMD } from '@/stores/date';

const getFirstAndLastWeek = ({ year, month, day }: TDateYMD) => {
  const date = moment({ year, month: month - 1, day });

  const firstWeek = date.clone().startOf('month').week();

  return [firstWeek, firstWeek + 5];
};

export { getFirstAndLastWeek };
