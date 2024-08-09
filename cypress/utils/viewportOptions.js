require('dotenv').config();

const resolutions = require('../fixtures/screen-resolutions');
const DEVICE_NAME = process.env.DEVICE_NAME || 'Dell XPS 15';

function getViewPortOptions(deviceName) {
    if (!deviceName) {
        throw new Error(`The parameter "${deviceName}" is required`);
    }

    const dimensioner = resolutions.find(device => device.name === deviceName);

    if (!dimensioner) {
        throw new Error(`Could not find device: "${deviceName}"`);
    }

    return dimensioner.viewport;
}

function setNewViewPort(config) {
    if (!config) {
        throw new Error('The config object is required');
    }

    const options = getViewPortOptions(DEVICE_NAME);
    config.viewportWidth = options.viewportWidth;
    config.viewportHeight = options.viewportHeight;

    return config;
}

module.exports = {

    /**
     * Retorna as dimensões da tela para um dispositivo.
     * 
     * @param {string} deviceName - Nome do dispositivo (ex: "iPhone 12").
     * @returns {object} - Dimensões da tela (`viewportWidth`, `viewportHeight`).
     * @throws {Error} - Se o `deviceName` for inválido.
     */
    getViewPortOptions,

    /**
     * Atualiza a configuração da viewport para um dispositivo.
     * 
     * @param {object} config - Configuração a ser atualizada.
     * @returns {object} - Configuração atualizada.
     */
    setNewViewPort
};