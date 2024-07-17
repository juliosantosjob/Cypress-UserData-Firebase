const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter')

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      allureCypress(on)
    },
  },
});
