import { faker } from '@faker-js/faker';

export const newUser = () => {
    return {
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        zipCode: faker.address.zipCode()
    };
};