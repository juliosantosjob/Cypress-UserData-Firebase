import user from '../fixtures/user-data';
import devices from '../fixtures/screen-resolutions';
import products from '../fixtures/home-items';

const { randomValueFrom } = require('rand-select');

const generateData = () => {

    /**
     * Filtro todos os dispositivos pelo tipo 
     * para obter os mesmos randomicamente.
     */

    const desktopDevices = devices.filter(device => device.type.toLowerCase() === 'desktop');
    const mobileDevices = devices.filter(device => device.type.toLowerCase() === 'mobile');
    const tabletDevices = devices.filter(device => device.type.toLowerCase() === 'tablet');

    return ({
        random: {
            product: randomValueFrom({ array: products.productList }),
            desktop: randomValueFrom({ array: desktopDevices }),
            mobile: randomValueFrom({ array: mobileDevices }),
            tablet: randomValueFrom({ array: tabletDevices }),
            user: {
                firstName: randomValueFrom({ array: user.firstName }),
                lastName: randomValueFrom({ array: user.lastName }),
                zipCode: randomValueFrom({ array: user.zipCode })
            },
        },
        static: {
            product: products.productList,
            desktop: desktopDevices,
            mobile: mobileDevices,
            tablet: tabletDevices,
            user: {
                firstName: user.firstName[0],
                lastName: user.lastName[0],
                zipCode: user.zipCode[0]
            }
        }
    });
};

export default {
    generateData
};