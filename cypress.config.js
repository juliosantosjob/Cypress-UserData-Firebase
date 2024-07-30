require('dotenv').config();

const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
const { tasks } = require('./cypress/utils/tasksRegistry');

const viewport = require('./cypress/utils/viewportOptions');
const BASE_URL = process.env.BASE_URL;

module.exports = defineConfig({
    chromeWebSecurity: false,
    e2e: {
        viewportWidth: viewport.width,
        viewportHeight: viewport.height,
        setupNodeEvents(on, config) {
            allureCypress(on);
            tasks(on);

            config.baseUrl = BASE_URL;
            return config;
        }
    }
});