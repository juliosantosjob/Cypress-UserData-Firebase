require('dotenv').config();

const platform = process.env.APPLICATION_TYPE || 'desktop';

const sizes = {
    desktop: { width: 1280, height: 720 },  // Desktop
    mobile: { width: 320, height: 480 },    // Mobile
    tablet: { width: 768, height: 1024 }    // Tablet
};

function viewPortOptions(options) {
    const platform = String(options.toLowerCase());

    if (!['desktop', 'mobile', 'table'].includes(platform)) {
        throw new Error(`Invalid argument: "${options}". ` +
            'The options for viewport are: "desktop", "mobile", "tablet".');
    }
    return sizes[platform];
}

/**
 * Retorna as opções de viewport para diferentes platformas
 * 
 * @param {string} platform
 * @returns {object}
 */

module.exports = viewPortOptions(platform);