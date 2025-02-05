import { toZonedTime } from 'date-fns-tz';
import { startOfDay } from 'date-fns';

export const todayDate = (): Date => {
  const brasiliaTimezone = 'America/Sao_Paulo';
  const now = startOfDay(new Date());

  return toZonedTime(now, brasiliaTimezone);
};
