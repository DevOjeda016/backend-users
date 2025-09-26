import { config } from 'dotenv';

config();

export default {
  out: './drizzle',
  schema: './src/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
};
