import { faker } from '@faker-js/faker';
import { UserData } from './types/test-data.types';

export class TestDataFactory {
  static createUser(overrides?: Partial<UserData>): UserData {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12, memorable: false }),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      phone: faker.phone.number(),
      ...overrides,
    };
  }
}
