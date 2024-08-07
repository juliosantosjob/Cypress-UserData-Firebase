require('dotenv').config();

const { defineConfig } = require('cypress');
const { setNewViewPort } = require('./cypress/utils/viewportOptions');
const { allureCypress } = require('allure-cypress/reporter');
const { tasks } = require('./cypress/utils/tasksRegistry');

module.exports = defineConfig({
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, config) {
            setNewViewPort(config);
            allureCypress(on);
            tasks(on);

            config.baseUrl = process.env.BASE_URL;
            return config;
        }
    }
});
