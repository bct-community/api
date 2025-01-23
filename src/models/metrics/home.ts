import { Schema, model } from 'mongoose';

const homeSchema = new Schema(
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

export const HomeModel = model('HomeModel', homeSchema);
