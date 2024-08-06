const resolutions = require('../fixtures/screen-resolutions');

function getViewPortOptions(deviceName) {
    if (deviceName === null) {
        throw new Error(`"${deviceName}" cannot be null or undefined`);
    }
    const dimensioner = resolutions
        .find(devices => devices.name === deviceName);

    if (!dimensioner) {
        throw new Error(`Could not find device: "${deviceName}"`);
    }
    return dimensioner['viewport'];
}

module.exports = {

    /**
     * Obtém as dimensões de tela para um dispositivo específico a partir de 
     * `screen-resolutions.json`.
     * 
     * @param {string} deviceName - Nome do dispositivo. Exemplo: "iPhone 12".
     * @returns {object} - Objeto com as dimensões da tela (`width` e `height`).
     * @throws {Error} - Lança um erro se o `deviceName` for inválido ou não encontrado.
     */

    getViewPortOptions
};
