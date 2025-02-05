import { eachDayOfInterval, format } from 'date-fns';

export const generateDailyCounts = (
  date: Date,
  days: number,
  records: { date: Date }[]
): { date: string; count: number }[] => {
  const dateFormat = 'dd/MM/yyyy';
  const startDate = new Date(date);
  startDate.setDate(startDate.getDate() - days);

  const recordsMap = new Map<string, number>();

  records.forEach((record) => {
    const formattedRecordDate = format(record.date, dateFormat);
    recordsMap.set(
      formattedRecordDate,
      (recordsMap.get(formattedRecordDate) || 0) + 1
    );
  });

  return eachDayOfInterval({ start: startDate, end: date }).map(
    (currentDate) => ({
      date: format(currentDate, dateFormat),
      count: recordsMap.get(format(currentDate, dateFormat)) || 0,
    })
  );
};
