interface IDateData {
  day: string | number;
  month: string | number;
  year: string | number;
}

const compareDate = <T extends IDateData, G extends IDateData>(
  date1: T,
  date2: G,
) => {
  return (
    date1.day == date2.day &&
    date1.month == date2.month &&
    date1.year == date2.year
  );
};

export { compareDate };
