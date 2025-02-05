import { startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const todayDate = (): Date => {
  const brasiliaTimezone = 'America/Sao_Paulo';
  const now = startOfDay(new Date());

  return toZonedTime(now, brasiliaTimezone);
};
