require("dotenv").config();

const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
const { setNewViewPort } = require("./cypress/utils/viewportOptions");
const { tasksRegistry } = require("./cypress/utils/tasksRegistry");
const { setupEnv } = require("./cypress/utils/enviroments");

module.exports = defineConfig({
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, config) {
            setNewViewPort(config);
            setupEnv(config);
            allureCypress(on);
            tasksRegistry(on);

            return config;
        }
    }
});