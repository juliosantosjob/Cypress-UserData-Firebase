require('dotenv').config();

const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');
const { tasks } = require('./cypress/utils/tasksRegistry');

const PLATFORM = process.env.APPLICATION_TYPE;
const DEVICE_NAME = process.env.DEVICE_NAME || 'Dell XPS 15';
const BASE_URL = process.env.BASE_URL;

const { getViewPortOptions } = require('./cypress/utils/viewportOptions');
const setViewPort = getViewPortOptions(PLATFORM, DEVICE_NAME);

const { viewportWidth, viewportHeight } = setViewPort;

module.exports = defineConfig({
    chromeWebSecurity: false,
    e2e: {
        viewportWidth,
        viewportHeight,
        setupNodeEvents(on, config) {
            allureCypress(on);
            tasks(on);

            config.baseUrl = BASE_URL;
            return config;
        }
    }
});