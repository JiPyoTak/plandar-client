const getTimeString = (
  date: Date,
  { showMinutes }: { showMinutes?: boolean } = { showMinutes: true },
) => {
  if (!(date instanceof Date))
    throw Error(`getTimeString : 올바른 Date 값을 넣어주세요`);

  const timeString = new Intl.DateTimeFormat('ko', {
    hour: '2-digit',
    hour12: true,
    minute: showMinutes ? '2-digit' : undefined,
  }).format(date);

  return timeString;
};

export { getTimeString };
