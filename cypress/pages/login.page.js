class LoginPage {

    /**
     * Construtor com os localizadores para centralizar 
     * os elementos e reaproveitar os mesmos em metodos
     * diferentes, estão definidos em ordem alfabetica
     */

    constructor() {
        this.btnBurgerMenu = '#react-burger-menu-btn'
        this.btnLogout = '#logout_sidebar_link'
        this.btnSubmit = '#login-button'
        this.fldLoginLogo = '[class="login_logo"]'
        this.fldMsgError = '[data-test="error"]'
        this.fldTitleProducts = '[data-test="title"]'
        this.iptPassword = '#password'
        this.iptUsername = '#user-name'
    }

    goToLoginPage() {
        cy.visit('/')
        cy.contains(this.fldLoginLogo, 'Swag Labs')
            .should('be.visible')
    }

    fillCredents(username, password) {
        username !== ''
            ? cy.get(this.iptUsername).type(username)
            : cy.get(this.iptUsername).clear();

        password !== ''
            ? cy.get(this.iptPassword).type(password)
            : cy.get(this.iptPassword).clear()
    }

    submit() {
        cy.get(this.btnSubmit).click()
    }

    atHome() {
        cy.contains(this.fldTitleProducts, 'Products')
            .should('be.visible')
    }

    verifyError(message) {
        cy.contains(this.fldMsgError, message)
            .should('be.visible')
    }

    doLogout() {
        cy.get(this.btnBurgerMenu).click()
        cy.get(this.btnLogout).click()
    }

    doLogin(username, password) {
        this.goToLoginPage()
        this.fillCredents(username, password)
        this.submit()
        this.atHome()
    }
}

export default new LoginPage;