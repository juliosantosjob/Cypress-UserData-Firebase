/**
 * Criei um comando para digitar ou limpar o campo 
 * caso o parametro texto seja vazio
 * 
 * @param {string} selector 
 * @param {string} text
 */

Cypress.Commands.add("typeOrClear", (selector, text) => {
    text === ""
        ? cy.get(selector).clear()
        : cy.get(selector).type(text, { log: false });
});