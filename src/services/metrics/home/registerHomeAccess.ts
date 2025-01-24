import { HomeMetricsModel } from '@/models/metrics/home.js';

const register = async ({
  country,
  date,
}: {
  country: string;
  date: string;
}) => {
  const newAccess = new HomeMetricsModel({
    country,
    date,
  });

  await newAccess.save();
};

export { register };
