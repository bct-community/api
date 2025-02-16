import { startOfDay, subDays } from 'date-fns';

interface DateRange {
  startDate: Date;
  endDate: Date;
}

export const calculateDateRange = (date: Date, days: number): DateRange => {
  const parsedDate = startOfDay(date);
  const startDate = startOfDay(subDays(parsedDate, days - 1));
  const endDate = parsedDate;

  return { startDate, endDate };
};
