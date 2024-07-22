class LoginPage {

    /**
     * Construtor com os localizadores para centralizar 
     * os elementos e reaproveitar os mesmos em metodos
     * diferentes, estão definidos em ordem alfabetica
     */

    constructor() {
        this.buttonBurgerMenu = '#react-burger-menu-btn'
        this.buttonLogout = '#logout_sidebar_link'
        this.buttonSubmit = '#login-button'
        this.fieldLoginLogo = '[class="login_logo"]'
        this.fieldMsgError = '[data-test="error"]'
        this.fieldTitleProducts = '[data-test="title"]'
        this.inputPassword = '#password'
        this.inputUsername = '#user-name'
    }

    goToLoginPage() {
        cy.visit('/')
        cy.contains(this.fieldLoginLogo, 'Swag Labs')
            .should('be.visible')
    }

    fillCredents(username, password) {
        cy.typeOrClear(this.inputUsername, username)
        cy.typeOrClear(this.inputPassword, password)
    }

    submit() {
        cy.get(this.buttonSubmit).click()
    }

    atHome() {
        cy.contains(this.fieldTitleProducts, 'Products')
            .should('be.visible')
    }

    verifyError(message) {
        cy.contains(this.fieldMsgError, message)
            .should('be.visible')
    }

    doLogout() {
        cy.get(this.buttonBurgerMenu).click()
        cy.get(this.buttonLogout).click()
    }

    doLogin(username, password) {
        this.goToLoginPage()
        this.fillCredents(username, password)
        this.submit()
        this.atHome()
    }
}

export default new LoginPage;