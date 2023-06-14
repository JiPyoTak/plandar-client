import { TDateYMD } from '@/stores/date';
import { IExtractedTimeInfo } from '@/types/time';

const getTimeString = (
  date: Date,
  {
    showMinutes = true,
    hourPadZero = true,
  }: { showMinutes?: boolean; hourPadZero?: boolean },
) => {
  if (!(date instanceof Date))
    throw Error(`getTimeString : 올바른 Date 값을 넣어주세요`);

  const timeString = new Intl.DateTimeFormat('ko', {
    hour: hourPadZero ? '2-digit' : 'numeric',
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
const extractTimeFromString = (time: string): IExtractedTimeInfo => {
  let invalid = false;
  const timeReg = /(\d{1,2})[.:시\s]*(\d{0,2}).*/;

  const match = time.match(timeReg);
  invalid ||= !match;

  let [hour, minute] = match?.slice(1, 3).map((v) => (v ? Number(v) : 0)) ?? [
    0, 0,
  ];

  if (minute >= 60) {
    invalid = true;
  }
  // 30 -> 03:00 으로 변환
  else if (hour >= 24) {
    const [_hour, _minute] = [
      Math.floor(hour / 10),
      Math.floor(Number(`${hour % 10}${minute}`)),
    ];
    if (_hour >= 24 || _minute >= 60) {
      invalid = true;
    } else {
      hour = _hour;
      minute = _minute;
    }
  }

  const pmReg = /(p.*m|오.*후)/i;
  const isPM = hour > 12 || pmReg.test(time);

  return {
    invalid, // 시간에 대한 정보가 없으면 invalid 하다고 판단. ex) 오후 -> invalid, 오후 10시 -> valid
    meridiem: isPM ? '오후' : '오전',
    hour: hour > 12 ? hour - 12 : hour === 0 ? 12 : hour,
    minute,
  };
};

export { getTimeString, getDateString, extractTimeFromString };
