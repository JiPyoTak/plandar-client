import moment, { MomentInput } from 'moment';

const getTimeMinute = (date: MomentInput) => {
  const dateMoment = moment(date);
  const midnight = dateMoment.startOf('day');

  return dateMoment.diff(midnight, 'minute');
};

export { getTimeMinute };
