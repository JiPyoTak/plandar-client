import { ICalendarInfo } from './getCalendarInfo';
import { TDateYMD } from '@/stores/date';

const compareStoreDateToCalendarInfo = (
  dateInfo: ICalendarInfo,
  storeDate: TDateYMD,
) => {
  return (
    dateInfo.day === storeDate.day &&
    dateInfo.month === storeDate.month &&
    dateInfo.year === storeDate.year &&
    dateInfo.isInMonth
  );
};

export { compareStoreDateToCalendarInfo };
