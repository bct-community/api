import { Schema, model } from 'mongoose';

const homeMetricsSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { collection: 'home_metrics' }
);

export const HomeMetricsModel = model('HomeMetricsModel', homeMetricsSchema);
