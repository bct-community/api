import { format, parse, subDays } from 'date-fns';

export const calculateDateRange = (
  date: string,
  days: number,
  dateFormat = 'dd/MM/yyyy'
) => {
  const parsedDate = parse(date, dateFormat, new Date());

  const startDate = subDays(parsedDate, days);

  return {
    startDate: format(startDate, dateFormat),
    endDate: format(parsedDate, dateFormat),
  };
};
