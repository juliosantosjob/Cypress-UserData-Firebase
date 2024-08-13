require("dotenv").config();

const resolutions = require("../fixtures/screen-resolutions");
const DEVICE_NAME = process.env.DEVICE_NAME || "Dell XPS 15";

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
        throw new Error("The \"config\" object is required");
    }

    const { viewportWidth, viewportHeight } = getViewPortOptions(DEVICE_NAME);
    
    config.viewportWidth = viewportWidth;
    config.viewportHeight = viewportHeight;
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
     * @param {object} config - Objeto de configuração do cypress.
     * @returns {object} - Traz um nova configuração de viewport.
     * @throws {Error} - Caso o objeto config seja null.
     */
    setNewViewPort
};