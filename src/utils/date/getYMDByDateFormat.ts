import moment from 'moment';

const getYMDByDateFormat = (start: string, end: string) => {
  const startMo = moment(start).startOf('w').startOf('d');
  const endMo = moment(end).endOf('w').endOf('d');

  const startYMD = {
    year: startMo.year(),
    month: startMo.month(),
    day: startMo.date(),
  };

  const endYMD = {
    year: endMo.year(),
    month: endMo.month(),
    day: endMo.date(),
  };

  return [startYMD, endYMD];
};

export { getYMDByDateFormat };
