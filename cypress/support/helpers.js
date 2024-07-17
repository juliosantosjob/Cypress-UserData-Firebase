import { faker } from '@faker-js/faker';

module.exports = {
    userInfo: {
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        zipCode: faker.address.zipCode()
    }
}