import { Schema, model } from 'mongoose';

const ArtsMetricsSchema = new Schema(
  {
    xProfile: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { collection: 'arts_metrics' }
);

export const ArtsMetricsModel = model('artsMetricsModel', ArtsMetricsSchema);
