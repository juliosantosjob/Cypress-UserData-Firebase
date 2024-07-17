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

    submitLogin() {
        cy.get('[data-test="login-button"]').click()
    }

    beLogged() {
        cy.contains('[data-test="title"]', 'Products')
            .should('be.visible')
    }

    verifyLoginFailed(message) {
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
        this.submitLogin()
        this.beLogged()
    }
}

export default new LoginPage;