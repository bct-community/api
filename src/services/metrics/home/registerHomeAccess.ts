import { HomeModel } from '@/models/metrics/home.js';

const register = async ({
  country,
  date,
}: {
  country: string;
  date: string;
}) => {
  const newAccess = new HomeModel({
    country,
    date,
  });

  await newAccess.save();
};

export { register };
