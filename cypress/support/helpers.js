import { faker } from '@faker-js/faker';

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
        : cy.get(selector).type(text)
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