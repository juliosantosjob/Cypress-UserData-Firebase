const resolutions = require('../fixtures/screen-resolutions');

function getViewPortOptions(platform, deviceName) {
    if (platform === null || deviceName === null) {
        throw new Error('The parameters "platform" and "deviceName" are required!');
    }

    const context = platform.toLowerCase().toString();
    const possibilities = ['desktop', 'mobile', 'table'];

    if (!possibilities.includes(context)) {
        throw new Error(
            `Invalid argument: "${platform}". The valid platform ` +
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
     * A função `getViewPortOptions` obtém as dimensões de tela dos dispositivos salvos no arquivo
     * `screen-resolutions.json`. Para utilizar e definir o viewport para o teste, passe os 
     * seguintes parâmetros:
     * 
     * - `platform`: a plataforma do dispositivo. As opções disponíveis são: "desktop", "mobile" ou
     *  "tablet".
     * - `deviceName`: o nome do dispositivo para validação.
     * 
     * A função retorna um objeto contendo as dimensões de tela do dispositivo solicitado e salva 
     * essas dimensões no arquivo de configuração padrão do Cypress.
     * 
     * Exemplo de retorno: `{ width: 390, height: 844 }`
     * 
     * @param {string} platform - A plataforma do dispositivo ("desktop", "mobile", "tablet").
     * @param {string} deviceName - O nome específico do dispositivo. Exemplo: "HP Spectre x360".
     * @returns {object} - Um objeto com as dimensões de tela do dispositivo solicitado.
     */

    getViewPortOptions
};