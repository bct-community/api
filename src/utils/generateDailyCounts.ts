import { parse, subDays, format, eachDayOfInterval } from 'date-fns';

export const generateDailyCounts = (
  date: string,
  days: number,
  records: { date: string }[],
  dateFormat = 'dd/MM/yyyy'
) => {
  const parsedDate = parse(date, dateFormat, new Date());
  const startDate = subDays(parsedDate, days);

  const dailyCounts = eachDayOfInterval({
    start: startDate,
    end: parsedDate,
  }).map((currentDate) => {
    const formattedDate = format(currentDate, dateFormat);
    const count = records.filter(
      (record) => record.date === formattedDate
    ).length;

    return { date: formattedDate, count };
  });

  return dailyCounts;
};
