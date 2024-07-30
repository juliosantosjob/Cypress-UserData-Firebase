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

/**
 * Obtem o viewport dos dispositivos salvos no screen-resolutions.json
 * 
 * @param {string} platform
 * @returns {object}
 */


module.exports = {
    getViewPortOptions
};