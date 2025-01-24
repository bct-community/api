import { Schema, model } from 'mongoose';

const chatMetricsSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['user-message', 'raid-message'],
    },
  },
  { collection: 'chat_metrics' }
);

export const ChatMetricsModel = model('ChatMetricsModel', chatMetricsSchema);
