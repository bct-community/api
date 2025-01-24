import { ChatMetricsModel } from '@/models/metrics/chat.js';
import { calculateDateRange } from '@/utils/calculateDateRange.js';
import { generateDailyCounts } from '@/utils/generateDailyCounts.js';

const get = async ({ date }: { date: string }) => {
  const { startDate, endDate } = calculateDateRange(date, 7);

  const records = await ChatMetricsModel.find({
    date: { $gte: startDate, $lte: endDate },
    type: 'user-message',
  });

  if (!records) {
    return null;
  }

  const daily = generateDailyCounts(date, 7, records);

  const total = records.length;

  return { total, daily };
};

export { get };
