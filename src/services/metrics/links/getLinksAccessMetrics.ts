import { LinksMetricsModel } from '@/models/metrics/links.js';
import { calculateDateRange } from '@/utils/calculateDateRange.js';
import { generateDailyCounts } from '@/utils/generateDailyCounts.js';

const get = async ({ date }: { date: string }) => {
  const { startDate, endDate } = calculateDateRange(date, 7);

  const records = await LinksMetricsModel.find({
    date: { $gte: startDate, $lte: endDate },
  });

  if (!records) {
    return null;
  }

  const daily = generateDailyCounts(date, 7, records);

  const total = records.length;

  return { total, daily };
};

export { get };
