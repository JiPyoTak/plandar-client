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

  const hour = hourNum.toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');

  return `${isAM ? '오전' : '오후'} ${hour}${
    showMinutes ? `:${minute}` : '시'
  }`;
};

export { getTimeString };
