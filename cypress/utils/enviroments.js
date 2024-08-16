function setupEnv(config) {
    if (!config) {
        throw new Error("The \"config\" object is required");
    }

    const environment = process.env.ENV;

    if (!environment) {
        throw new Error("The \"ENV\" environment variable is required.");
    }

    const hosts = {
        stg: process.env.STAGING,
        dev: process.env.DEV
    };
    
    if (!hosts[environment]) {
        throw new Error(`The environment value "${environment}" is invalid. Use 'stg' or 'dev'.`);
    }

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
