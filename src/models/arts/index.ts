import mongoose, { Schema } from 'mongoose';
import { z } from 'zod';

export const ArtsSchema = z.array(
  z.object({
    approved: z.boolean(),
    name: z.string(),
    creator: z.string(),
    xProfile: z.string(),
    description: z.string(),
    url: z.string(),
  })
);

export type Arts = z.infer<typeof ArtsSchema>;

const artsSchema = new Schema({
  approved: { type: Boolean, required: true, default: false },
  name: { type: String, required: true },
  creator: { type: String, required: true },
  xProfile: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
});

export const ArtsModel = mongoose.model('Arts', artsSchema);
