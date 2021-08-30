import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

export default {
  type: process.env.DB_DEV_DIALECT,
  host: process.env.DB_DEV_HOSTNAME,
  port: process.env.DB_DEV_PORT,
  username: process.env.DB_DEV_USERNAME,
  password: process.env.DB_DEV_PASSWORD,
  database: process.env.DB_DEV_DATABASE,
  entities: ['./src/modules/**/typeorm/entities/*.ts'],
  migrations: ['./src/shared/typeorm/migrations/*.ts'],
  cli: {
    migrationsDir: './src/shared/typeorm/migrations',
  },
} as ConnectionOptions;
