import { toZonedTime, format } from 'date-fns-tz';

export const todayFormatted = () => {
  const brasiliaTimezone = 'America/Sao_Paulo';
  const now = new Date();

  const brasiliaDate = toZonedTime(now, brasiliaTimezone);

  return format(brasiliaDate, 'dd/MM/yyyy', {
    timeZone: brasiliaTimezone,
  });
};
