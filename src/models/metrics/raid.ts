import { Schema, model } from 'mongoose';

const raidMetricsSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
  },
  { collection: 'raid_metrics' }
);

export const RaidMetricsModel = model('RaidMetricsModel', raidMetricsSchema);
