require('dotenv').config();

const sizes = require('../fixtures/screen-resolutions');

const platform = process.env.APPLICATION_TYPE || 'desktop';
const deviceName = process.env.DEVICE_NAME || 'Dell XPS 15';

function setViewPortOptions(options, deviceName) {
    const platform = options.toLowerCase().toString();
   
    if (!['desktop', 'mobile', 'table'].includes(platform)) {
        throw new Error(`Invalid argument: "${options}". ` +
            'The options for viewport are: "desktop", "mobile", "tablet".');
    }

    const mensureDevice = sizes[platform].find(devices => devices.name === deviceName);

    if (!mensureDevice) {
        throw new Error(`Could not find device: "${deviceName}"`);
    }

    return {
        viewportWidth: mensureDevice[0],
        viewportHeight: mensureDevice[1]
    };
}

/**
 * Retorna as opções de viewport para diferentes platformas
 * 
 * @param {string} platform
 * @returns {object}
 */

module.exports = setViewPortOptions(platform, deviceName);