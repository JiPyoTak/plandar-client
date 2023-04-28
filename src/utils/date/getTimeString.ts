import { padZero } from '@/utils/padZero';

const getTimeString = (
  date: Date,
  { showMinutes }: { showMinutes?: boolean } = { showMinutes: true },
) => {
  if (!(date instanceof Date))
    throw Error(`getTimeString : 올바른 Date 값을 넣어주세요`);

  let hourNum = date.getHours();
  const isAM = hourNum < 12;

  hourNum = isAM ? hourNum : hourNum - 12;
  if (hourNum === 0) hourNum = 12;

  const hour = padZero(hourNum);
  const minute = padZero(date.getMinutes());

  return `${isAM ? '오전' : '오후'} ${hour}${
    showMinutes ? `:${minute}` : '시'
  }`;
};

export { getTimeString };
