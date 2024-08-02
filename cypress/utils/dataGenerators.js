import user from '../fixtures/user-data';
import option from '../fixtures/screen-resolutions';
import products from '../fixtures/itens-home';

/**
 * Gerador de valores aleatórios
 * 
 * @param {*} params 
 * @returns {}
 */

const randValue = (params = {}) => {
    let array;

    if (params.hasOwnProperty('array')) {
        array = params['array'];
    } else {
        throw new Error('To use "randValue" you must enter: "array".');
    }

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

const getNewUser = () => ({
    firstName: randValue({ array: user.firstName }),
    lastName: randValue({ array: user.lastName }),
    zipCode: randValue({ array: user.zipCode })
});

/**
 * Gera um novo item aleatório
 * 
 * @returns {object}
 */

const getRandItems = () => ({
    product: randValue({ array: products.productList }),
    mobile: randValue({ array: option.mobile }),
    tablet: randValue({ array: option.tablet })
});

export default {
    newUser: getNewUser,
    randItems: getRandItems
};