import { VisitsMetricsModel } from '@/models/metrics/visits.js';

const register = async ({
  country,
  date,
}: {
  country: string;
  date: string;
}) => {
  const newAccess = new VisitsMetricsModel({
    country,
    date,
  });

  await newAccess.save();
};

export { register };
