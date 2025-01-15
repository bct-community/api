import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
  PORT: z.coerce.number().min(1000),
  TOKEN_CONTACT_ADDRESS: z.string().nonempty(),
  CMC_API_URL: z.string().nonempty(),
  CMC_API_TOKEN: z.string().nonempty(),
  CMC_SOL_NETWORK_ID: z.string().nonempty(),
  CMC_API_AUX_FIELDS: z.string().nonempty(),
  TOKEN_CACHE_HOURS: z.coerce.number().min(1),
  MONGODB_CONNECTION_STRING: z.string().nonempty(),
  MONGODB_DB_NAME: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
