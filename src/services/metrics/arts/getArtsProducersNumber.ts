import { ArtsMetricsModel } from '@/models/metrics/arts.js';

const get = async () => {
  const records = await ArtsMetricsModel.find().distinct('xProfile');

  if (!records) {
    return null;
  }

  const count = records.length;

  return { count };
};

export { get };
