import { TPickIsBoolean } from '@/types';

const getDayClassName = (props: TPickIsBoolean) => {
  const { isToday, isInMonth, isWeekend, isSelected } = props;

  const classNames = [];
  if (!isInMonth) classNames.push('in_month');
  if (isWeekend) classNames.push('is_weekend');
  if (isSelected) classNames.push('is_selected');
  if (isToday) classNames.push('is_today');
  if (!isToday && !isSelected) classNames.push('hover');

  return classNames.join(' ');
};

export { getDayClassName };
