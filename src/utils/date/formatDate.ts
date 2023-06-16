type DateTimeFormatOptions =
  | 'numeric'
  | 'long'
  | 'short'
  | 'narrow'
  | undefined;

interface IFormatDateProps {
  startDate: Date;
  endDate?: Date;
  isTimeStyle?: boolean;
}

const DATE_FORMAT_OPTIONS: Record<string, DateTimeFormatOptions> = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'short',
};

const formatDateWithWeekday = ({
  startDate,
  endDate,
  isTimeStyle = false,
}: IFormatDateProps) => {
  const yearOption = endDate
    ? startDate.getFullYear() === endDate?.getFullYear()
      ? undefined
      : 'numeric'
    : undefined;

  const tomeStyleOptions: Record<string, DateTimeFormatOptions> = {
    hour: isTimeStyle ? 'numeric' : undefined,
    minute: isTimeStyle ? 'numeric' : undefined,
  };

  const options: Record<string, DateTimeFormatOptions> = {
    ...DATE_FORMAT_OPTIONS,
    ...tomeStyleOptions,
    year: yearOption,
  };

  const formattedStartDate = new Intl.DateTimeFormat('ko-KR', options).format(
    startDate,
  );

  const formattedEndDate = endDate
    ? new Intl.DateTimeFormat('ko-KR', options).format(endDate)
    : null;

  return [formattedStartDate, formattedEndDate];
};

export { formatDateWithWeekday };
