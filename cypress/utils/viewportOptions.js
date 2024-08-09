require('dotenv').config();

const resolutions = require('../fixtures/screen-resolutions');
const DEVICE_NAME = process.env.DEVICE_NAME || 'Dell XPS 15';

function getViewPortOptions(deviceName) {
<<<<<<< HEAD
    if (!deviceName) throw new Error(`The params "${deviceName}" is required`);
=======
    if (!deviceName) {
        throw new Error(`The params "${deviceName}" is required`);
    }
>>>>>>> a906070201ae6bdb342c670f18e3c39946c0398a

    const dimensioner = resolutions
        .find(devices => devices.name === deviceName);

<<<<<<< HEAD
    if (!dimensioner) throw new Error(`Could not find device: "${deviceName}"`);
=======
    if (!dimensioner) {
        throw new Error(`Could not find device: "${deviceName}"`);
    }

>>>>>>> a906070201ae6bdb342c670f18e3c39946c0398a
    return dimensioner['viewport'];
}

function setNewViewPort(config) {
    if (!config) throw new Error('The config object is required');

    const options = getViewPortOptions(DEVICE_NAME);
    config.viewportWidth = options.viewportWidth;
    config.viewportHeight = options.viewportHeight;

    return config;
}

module.exports = {

    /**
     * Obtém as dimensões da tela para um dispositivo específico.
     * 
     * @param {string} deviceName - Nome do dispositivo. Exemplo: "iPhone 12".
     * @returns {object} - Objeto com as dimensões da tela (`viewportWidth` e `viewportHeight`).
     * @throws {Error} - Lança um erro se o `deviceName` for inválido ou não encontrado.
     */

    getViewPortOptions,

    /**
     * Configura a viewport para um dispositivo específico e retorna a configuração atualizada.
     * 
     * @param {object} config - Objeto de configuração a ser atualizado.
     * @returns {object} - Configuração atualizada com as dimensões da viewport.
     */

    setNewViewPort
};
