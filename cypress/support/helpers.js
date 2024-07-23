import { el, faker } from '@faker-js/faker'

/**
 * Criei um comando para digitar ou limpar o campo 
 * caso o parametro texto esteja vazio
 * 
 * @param {string} selector 
 * @param {string} text
 */

Cypress.Commands.add('typeOrClear', (selector, text) => {
    text === ''
        ? cy.get(selector).clear()
        : cy.get(selector).type(text, { log: false })
})

/**
 * Este comando retorna os dados salvos no firebase realtime database
 * 
 * @param {string} route
 */

Cypress.Commands.add('getDataDB', (route) => {
    const url = `${Cypress.env('PROJECT_ID')}/${route}.json`

    cy.request({
        method: 'GET',
        url: url,
        failOnStatusCode: false
    }).then((response) => {
        if(!response) {
            throw new Error('Request failed with status code 404')
        } else {
            return response.body
        }
    })
})

/**
 * Criei esta const para gerar um usuario randomico
 * 
 * @returns {firstName: string, lastName: string, zipCode: string}
 */

export const userInfo = () => {
    return {
        firstName: faker.internet.userName(),
        lastName: faker.internet.userName(),
        zipCode: faker.address.zipCode()
    }
}