export const newUser = () => {
    return {
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        zipCode: faker.address.zipCode()
    };
};