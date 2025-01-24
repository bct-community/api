import { RaidModel, RaidSchema } from '@/models/raid/index.js';
import { todayFormatted } from '@/utils/todayFormatted.js';

export const raidData = async () => {
  const raid = await RaidModel.findOne({
    date: { $eq: todayFormatted() },
  }).exec();

  if (!raid) {
    console.log(`No raid found for date: ${todayFormatted()}`);
    return null;
  }

  const parsedRaid = RaidSchema.safeParse(raid.toObject());
  if (!parsedRaid.success) {
    console.log('Error parsing raid data:', parsedRaid.error);
    return null;
  }

  return parsedRaid.data;
};
