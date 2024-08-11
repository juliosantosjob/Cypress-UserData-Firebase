function setupEnv(config) {
    if (!config) {
        throw new Error('The "config" object is required');
    }

    const enviroment = process.env.ENV || 'stg';
    const hosts = {
        stg: process.env.STAGING,
        dev: process.env.DEV
    };
    
    config.baseUrl = hosts[enviroment];
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