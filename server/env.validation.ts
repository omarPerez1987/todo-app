import { z } from 'zod';

export const envSchema = z.object({
  POSTGRESQL_USERNAME: z.string(),
  POSTGRESQL_PASSWORD: z.string(),
  POSTGRESQL_DATABASE: z.string(),
});

export const env = envSchema.parse({
  POSTGRESQL_USERNAME: process.env.POSTGRESQL_USERNAME,
  POSTGRESQL_PASSWORD: process.env.POSTGRESQL_PASSWORD,
  POSTGRESQL_DATABASE: process.env.POSTGRESQL_DATABASE,
});
