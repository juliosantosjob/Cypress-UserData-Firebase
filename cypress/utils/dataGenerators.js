import { faker } from '@faker-js/faker';

/**
 * Gerador de valores aleatórios
 * 
 * @param {*} params 
 * @returns 
 */

const getRandomValue = (params = {}) => {
    let min, max, array;

    if (params.hasOwnProperty('min') && params.hasOwnProperty('max')) {
        min = params['min'];
        max = params['max'];
    } else if (params.hasOwnProperty('array')) {
        array = params['array'];
    } else {
        throw new Error('To use "getRandomValue" you must enter: "min", "max", or "array".');
    }

    if (array !== undefined) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    } else if (typeof min === 'number' && typeof max === 'number') {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString();
    } else {
        throw new Error('Invalid parameters. Use an array or two numbers.');
    }
};

/**
 * Gera um novo usuário aleatório
 * 
 * @returns {object}
 */

const newUser = () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    zipCode: faker.address.zipCode()
});

export {
    newUser,
    getRandomValue
};