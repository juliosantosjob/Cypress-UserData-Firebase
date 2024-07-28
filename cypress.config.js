require('dotenv').config();

const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
const { tasks } = require('./cypress/utils/tasks');

const BASE_URL = process.env.BASE_URL;

module.exports = defineConfig({
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, config) {
            allureCypress(on);
            tasks(on);

            config.baseUrl = BASE_URL;
            return config;
        }
    }
});