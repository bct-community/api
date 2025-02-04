import { ArtsMetricsModel } from '@/models/metrics/arts.js';

const get = async () => {
  const records = await ArtsMetricsModel.find().distinct('xProfile');

  if (!records || records.length === 0) {
    return null;
  }

  const count = records.length;

  return { count };
};

export { get };
