import { Schema, model } from 'mongoose';

const linksMetricsSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    linkId: {
      type: Schema.Types.ObjectId,
      ref: 'Links',
      required: true,
    },
  },
  { collection: 'links_metrics' }
);

export const LinksMetricsModel = model('LinksMetrics', linksMetricsSchema);
