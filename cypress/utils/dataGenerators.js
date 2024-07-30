import { 
    firstName, 
    lastName, 
    zipCode 
} from '../fixtures/user-data';

/**
 * Gerador de valores aleatórios
 * 
 * @param {*} params 
 * @returns 
 */

const getRandomValue = (params = {}) => {
    let array;

    if (array !== undefined) {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
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
    firstName: getRandomValue({ array: firstName }),
    lastName: getRandomValue({ array: lastName }),
    zipCode: getRandomValue({ array: zipCode })
});

export {
    newUser,
    getRandomValue
};