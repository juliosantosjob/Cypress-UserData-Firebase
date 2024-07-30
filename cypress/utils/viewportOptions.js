const resolutions = require('../fixtures/screen-resolutions');

function getViewPortOptions(options, deviceName) {
    if (options === undefined || deviceName === undefined) {
        throw new Error('The parameters "options" and "deviceName" are required!');
    }

    const platform = options.toLowerCase().toString();
    const possibilities = ['desktop', 'mobile', 'table'];

    if (!possibilities.includes(platform)) {
        throw new Error(
            `Invalid argument: "${platform}". The valid options ` +
            `for viewport are: [${possibilities.join(', ')}].`
        );
    }

    const deviceDimensioner = resolutions[platform]
        .find(devices => devices.name === deviceName);


    if (!deviceDimensioner) {
        throw new Error(`Could not find device: "${deviceName}"`);
    }

    return deviceDimensioner['viewport'];
}

module.exports = {

    /**
     * Obtém as dimensões de tela dos dispositivos armazenadas no arquivo screen-resolutions.json
     * O parâmetro "options" deve ser uma string que representa a plataforma de dispositivo 
     * (desktop, mobile ou table). O parâmetro "deviceName" deve ser uma string que representa
     * o nome do dispositivo. A função retorna um objeto com as dimensões de tela do dispositivo  
     * solicitado e os salva no arquivo de configuração padrão do cypress.
     * 
     * 
     * @param {string} platform
     * @returns {object}
     */

    getViewPortOptions
};