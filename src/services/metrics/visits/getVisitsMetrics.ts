import { VisitsMetricsModel } from '@/models/metrics/visits.js';
import { calculateDateRange } from '@/utils/calculateDateRange.js';
import { generateDailyCounts } from '@/utils/generateDailyCounts.js';

const get = async ({ date }: { date: string }) => {
  const { startDate, endDate } = calculateDateRange(date, 7);

  const records = await VisitsMetricsModel.find({
    date: { $gte: startDate, $lte: endDate },
  });

  if (!records || records.length === 0) {
    return null;
  }

  const daily = generateDailyCounts(date, 7, records);

  const total = records.length;

  const highestCount: number = daily.reduce(
    (acc, { count }) => (count > acc ? count : acc),
    0
  );

  return { total, highestCount, daily };
};

export { get };
