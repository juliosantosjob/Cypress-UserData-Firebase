require("dotenv").config();

function setupEnv(config) {
    const environment = process.env.ENV;
    
    if (!environment) {
        throw new Error("The \"ENV\" environment variable is required, use \"stg\" or \"dev\"");
    }

    const hosts = {
        stg: process.env.STAGING,
        dev: process.env.DEV
    };

    config.baseUrl = hosts[environment];
    return config;
}

module.exports = {

    /**
     * Retorna a URL base da aplicação.
     * 
     * @param {object} config - Configuração do Cypress.
     * @returns {string} - URL base da aplicação.
     */

    setupEnv 
};
