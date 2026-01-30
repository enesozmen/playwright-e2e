import dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.TEST_ENV || 'test';
dotenv.config({ path: path.resolve(__dirname, `../../.env.${envFile}`) });

export const config = {
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',

  users: {
    standard: {
      email: process.env.USER_EMAIL || 'user@example.com',
      password: process.env.USER_PASSWORD || 'user123',
    },
  },

  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
  },
};
