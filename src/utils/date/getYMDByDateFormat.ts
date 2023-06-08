import moment, { MomentInput } from 'moment';

const getYMDByDateFormat = (start: MomentInput, end: MomentInput) => {
  const startMo = moment(start);
  const endMo = moment(end);

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
