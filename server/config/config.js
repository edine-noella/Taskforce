import { config } from 'dotenv';

// CONFIGURE DOTENV
config();

// LOAD ENV VARIABLES
const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

// EXPORT CONFIG
export const development = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
  host: DB_HOST,
  dialect: 'postgres',
  dialectOptions: {
    connectTimeout: 60000,
    charset: 'utf8_general_ci',
  },
};
