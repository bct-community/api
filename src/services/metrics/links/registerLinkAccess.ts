import { LinksMetricsModel } from '@/models/metrics/links.js';

const register = async ({ date, linkId }: { date: string; linkId: string }) => {
  const newAccess = new LinksMetricsModel({
    date,
    linkId,
  });

  await newAccess.save();
};

export { register };
