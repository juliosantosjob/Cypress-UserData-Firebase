require('dotenv').config();

const resolutions = require('../fixtures/screen-resolutions');
const DEVICE_NAME = process.env.DEVICE_NAME || 'Dell XPS 15';

/**
 * Obtém as dimensões da tela para um dispositivo específico.
 * 
 * @param {string} deviceName - Nome do dispositivo. Exemplo: "iPhone 12".
 * @returns {object} - Objeto com as dimensões da tela (`viewportWidth` e `viewportHeight`).
 * @throws {Error} - Lança um erro se o `deviceName` for inválido ou não encontrado.
 */

function getViewPortOptions(deviceName) {
    if (typeof deviceName !== 'string' || !deviceName) {
        throw new Error(`"${deviceName}" deve ser uma string não vazia`);
    }

    const dimensioner = resolutions
        .find(devices => devices.name === deviceName);

    if (!dimensioner) {
        throw new Error(`Could not find device: "${deviceName}"`);
    }

    return dimensioner.viewport;
}

/**
 * Configura a viewport para um dispositivo específico e retorna a configuração atualizada.
 * 
 * @param {object} config - Objeto de configuração a ser atualizado.
 * @returns {object} - Configuração atualizada com as dimensões da viewport.
 */

function setNewViewPort(config) {
    if (!config) throw new Error('The config object is required');

    const options = getViewPortOptions(DEVICE_NAME);
    config.viewportWidth = options.viewportWidth;
    config.viewportHeight = options.viewportHeight;
    
    return config;
}

module.exports = {
    getViewPortOptions,
    setNewViewPort
};