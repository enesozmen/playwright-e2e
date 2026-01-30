import { config } from '../config/env.config';
import { UserData } from './types/test-data.types';

export const TestUsers = {
  standard: {
    email: config.users.standard.email,
    password: config.users.standard.password,
    firstName: 'Standard',
    lastName: 'User',
  } as UserData,

  invalid: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
    firstName: 'Invalid',
    lastName: 'User',
  } as UserData,
};
