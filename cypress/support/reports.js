/** 
 * Anexando screenshot ao relatório do allure
 */

Cypress.on('test:after:run', (test, runnable) => {
    cy.screenshot()

    const screenshotName = `${runnable.parent.title} - ${test.title}.png`
    const screenshotPath = `screenshots/${Cypress.spec.name}/${screenshotName}`

    cy.allure().logStep(`Attaching screenshot ${screenshotName}`)
    cy.allure().attachment('Screenshot', screenshotPath, 'image/png')
})