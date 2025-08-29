// Importe allure plugin
import "allure-cypress/commands";

// Importe cypress commands
import "./commands";

afterEach(() => {
    if (Cypress.spec.relative.includes("ui")) {
        cy.screenshot();
    }
});