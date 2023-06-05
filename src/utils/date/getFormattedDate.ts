import moment from 'moment';

import { TDateYMD } from '@/stores/date';

const getFormattedDate = (start: TDateYMD, end: TDateYMD) => {
  const startFormat = moment(start).format();
  const endFormat = moment(end).endOf('d').format();

  return { startFormat, endFormat };
};

export { getFormattedDate };
