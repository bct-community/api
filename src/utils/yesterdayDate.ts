import { toZonedTime } from 'date-fns-tz';
import { startOfDay, subDays } from 'date-fns';

export const yesterdayDate = (): Date => {
  const brasiliaTimezone = 'America/Sao_Paulo';
  const yesterday = startOfDay(subDays(new Date(), 1));

  return toZonedTime(yesterday, brasiliaTimezone);
};
