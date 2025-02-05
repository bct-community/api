import { startOfDay, subDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const yesterdayDate = (): Date => {
  const brasiliaTimezone = 'America/Sao_Paulo';
  const yesterday = startOfDay(subDays(new Date(), 1));

  return toZonedTime(yesterday, brasiliaTimezone);
};
