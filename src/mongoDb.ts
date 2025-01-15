import mongoose from 'mongoose';
import { toZonedTime, format } from 'date-fns-tz';

import { env } from './config.js';
import { RaidModel, RaidSchema } from './models.js';

export const connectToMongoDb = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_CONNECTION_STRING, {
      dbName: env.MONGODB_DB_NAME,
    });
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected.');
});

export const raidData = async () => {
  const brasiliaTimezone = 'America/Sao_Paulo';
  const now = new Date();

  const brasiliaDate = toZonedTime(now, brasiliaTimezone);

  const todayFormatted = format(brasiliaDate, 'dd/MM/yyyy', {
    timeZone: brasiliaTimezone,
  });

  const raid = await RaidModel.findOne({
    date: { $eq: todayFormatted },
  }).exec();

  if (!raid) {
    console.log(`No raid found for date: ${todayFormatted}`);
    return null;
  }

  const parsedRaid = RaidSchema.safeParse(raid.toObject());
  if (!parsedRaid.success) {
    console.log('Error parsing raid data:', parsedRaid.error);
    return null;
  }

  return parsedRaid.data;
};
