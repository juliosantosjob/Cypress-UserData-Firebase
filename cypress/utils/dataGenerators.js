import user from '../fixtures/user-data';
import option from '../fixtures/screen-resolutions';
import products from '../fixtures/itens-home';

const { randomValueFrom } = require('rand-select');

const getNewUser = () => {
    return ({
        firstName: randomValueFrom({ array: user.firstName }),
        lastName: randomValueFrom({ array: user.lastName }),
        zipCode: randomValueFrom({ array: user.zipCode })
    });
};

const getRandItems = () => {
    return ({
        product: randomValueFrom({ array: products.productList }),
        mobile: randomValueFrom({ object: option.mobile }),
        tablet: randomValueFrom({ object: option.tablet })
    });
};

export default {
    newUser: getNewUser,
    randItems: getRandItems
};