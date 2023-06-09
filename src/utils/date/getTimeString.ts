import { TDateYMD } from '@/stores/date';

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

const getDateString = (date: Date | TDateYMD) => {
  const dateObj =
    date instanceof Date
      ? date
      : new Date(date.year, date.month - 1, date.day, 9);

  const todayYear = new Date().getFullYear();

  return `${
    dateObj.getFullYear() === todayYear ? '' : `${dateObj.getFullYear()}년 `
  }${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
};

// '오전 10시 23분' 과 같은 문자열을 { meridiem: '오전', hour: 10, minute: 23 } 과 같은 객체로 변환
const extractTimeFromString = (time: string) => {
  const timeReg = /(\d{1,2})[.:시\s]*(\d{1,2})*/;

  const match = time.match(timeReg);

  const [hour, minute] = match?.slice(1, 3).map((v) => (v ? Number(v) : 0)) ?? [
    0, 0,
  ];

  const pmReg = /(p.*m|오.*후)/i;
  const isPM = hour > 12 || pmReg.test(time);

  return {
    invalid: !match, // 시간에 대한 정보가 없으면 invalid 하다고 판단. ex) 오후 -> invalid, 오후 10시 -> valid
    meridiem: isPM ? '오후' : '오전',
    hour: hour > 12 ? hour - 12 : hour,
    minute,
  };
};

export { getTimeString, getDateString, extractTimeFromString };
