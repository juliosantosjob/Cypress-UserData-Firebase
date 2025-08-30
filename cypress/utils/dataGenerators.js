import devices from "../fixtures/screen-resolutions";
import products from "../fixtures/home-items";

const { randomValueFrom } = require("rand-select");

const randomData = () => {

    /**
     * Filtro todos os dispositivos pelo tipo
     * para obter os mesmos randomicamente.
     */

    const desktopOptions = devices.filter(device => device.type.toLowerCase() === "desktop");
    const mobileOptions = devices.filter(device => device.type.toLowerCase() === "mobile");
    const tabletOptions = devices.filter(device => device.type.toLowerCase() === "tablet");

    return ({
        product: randomValueFrom({ array: products.productList }),
        devices: {
            desktop: randomValueFrom({ array: desktopOptions }),
            mobile: randomValueFrom({ array: mobileOptions }),
            tablet: randomValueFrom({ array: tabletOptions })
        }
    });
};

export default {

    /**
     * Retorna um objeto com dados aleatórios.
     *
     * @returns {object} - Objeto com producto e dispositivos aleatórios.
     */

    randomData
};