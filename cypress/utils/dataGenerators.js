import devices from '../fixtures/screen-resolutions';
import products from '../fixtures/home-items';

const { randomValueFrom } = require('rand-select');

const randomData = () => {

    /**
     * Filtro todos os dispositivos pelo tipo 
     * para obter os mesmos randomicamente.
     */

    const desktopDevices = devices.filter(device => device.type.toLowerCase() === 'desktop');
    const mobileDevices = devices.filter(device => device.type.toLowerCase() === 'mobile');
    const tabletDevices = devices.filter(device => device.type.toLowerCase() === 'tablet');

    return ({
        product: randomValueFrom({ array: products.productList }),
        desktop: randomValueFrom({ array: desktopDevices }),
        mobile: randomValueFrom({ array: mobileDevices }),
        tablet: randomValueFrom({ array: tabletDevices })
    });
};

export default {
    randomData
};