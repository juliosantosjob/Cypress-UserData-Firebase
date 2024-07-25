const axios = require('axios')
require('dotenv').config()

const { defineConfig } = require('cypress')
const { allureCypress } = require('allure-cypress/reporter')

if (!process.env.BASE_URL) throw new Error('BASE_URL is not defined')
if (!process.env.PROJECT_ID) throw new Error('PROJECT_ID is not defined')

const BASE_URL = process.env.BASE_URL
const PROJECT_ID = process.env.PROJECT_ID
const FB_URL = `https://${PROJECT_ID}.firebaseio.com`

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on)
      config.baseUrl = BASE_URL

      on('task', {
        getUser({ route }) {
          if (!route) {
            throw new Error('Route is required to use this task!')
          }
          if (typeof route !== 'string') {
            throw new Error('Route needs to be a string!')
          }

          const URL = `${FB_URL}/${route}.json`
          return axios
            .get(URL)
            .then(response => response.data)
            .catch(error => {
              console.error(error)
              throw new Error('Could not fetch this user from Firebase')
            })
        }
      })
      
      return config
    }
  }
})