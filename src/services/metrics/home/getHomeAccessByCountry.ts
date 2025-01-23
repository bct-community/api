import { HomeModel } from '@/models/metrics/home.js';

const get = async () => {
  const countries = await HomeModel.aggregate([
    {
      $group: {
        _id: '$country',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        country: '$_id',
        count: 1,
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  if (!countries || countries.length === 0) {
    return null;
  }

  return { countries };
};

export { get };
