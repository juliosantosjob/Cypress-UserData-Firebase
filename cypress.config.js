const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter')

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on)
      return config
    }
  }
})