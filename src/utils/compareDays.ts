import moment from 'moment';

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

export { compareDays };
