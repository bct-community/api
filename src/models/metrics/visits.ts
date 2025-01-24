import { Schema, model } from 'mongoose';

const visitsMetricsSchema = new Schema(
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
  { collection: 'visits_metrics' }
);

export const VisitsMetricsModel = model(
  'VisitsMetricsModel',
  visitsMetricsSchema
);
