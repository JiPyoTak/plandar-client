import moment, { MomentInput } from 'moment';

const getTimeMinute = (date: MomentInput) => {
  const dateMoment = moment(date);
  const midnight = dateMoment.clone().startOf('day');

  return dateMoment.diff(midnight, 'minute');
};

export { getTimeMinute };
