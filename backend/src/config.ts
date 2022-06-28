import dotenv from 'dotenv';

dotenv.config();

const {
  PORT,
  HOST,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASS,
  POSTGRES_DB,
  BCRYPT_PASSWORD,
  SECRET_TOKEN,
  SALT_ROUNDS,
} = process.env;

export default {
  port: PORT,
  dbPort: POSTGRES_PORT,
  host: HOST,
  dbHost: POSTGRES_HOST,
  user: POSTGRES_USER,
  password: POSTGRES_PASS,
  database: POSTGRES_DB,
  secretToken: SECRET_TOKEN,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
};
