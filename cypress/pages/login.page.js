class LoginPage {

    goToLoginPage() {
        cy.visit('/')

        cy.contains('[class="login_logo"]', 'Swag Labs')
            .should('be.visible')
    }

    fillCredents(username, password) {
        username !== ''
            ? cy.get('#user-name').type(username)
            : cy.get('#user-name').clear();

        password !== ''
            ? cy.get('#password').type(password)
            : cy.get('#password').clear()
    }

    submit() {
        cy.get('[type="submit"]').click()
    }

    atHome() {
        cy.contains('[data-test="title"]', 'Products')
            .should('be.visible')
    }

    verifyError(message) {
        cy.contains('[data-test="error"]', message)
            .should('be.visible')
    }

    doLogout() {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()
    }

    doLogin(username, password) {
        this.goToLoginPage()
        this.fillCredents(username, password)
        this.submit()
        this.atHome()
    }
}

export default new LoginPage;