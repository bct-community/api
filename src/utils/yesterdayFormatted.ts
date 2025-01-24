import { toZonedTime, format } from 'date-fns-tz';

export const yesterdayFormatted = () => {
  const brasiliaTimezone = 'America/Sao_Paulo';
  const now = new Date();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const brasiliaDate = toZonedTime(yesterday, brasiliaTimezone);

  return format(brasiliaDate, 'dd/MM/yyyy', {
    timeZone: brasiliaTimezone,
  });
};
