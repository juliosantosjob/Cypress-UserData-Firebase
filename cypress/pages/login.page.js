class LoginPage {
    
    constructor() {
        this.buttonBurgerMenu = '#react-burger-menu-btn';
        this.buttonLogout = '#logout_sidebar_link';
        this.buttonSubmit = '#login-button';
        this.fieldLoginLogo = '[class="login_logo"]';
        this.fieldMsgError = '[data-test="error"]';
        this.fieldTitleProducts = '[data-test="title"]';
        this.inputPassword = '#password';
        this.inputUsername = '#user-name';
        this.textTitle = 'Swag Labs';
        this.textProducts = 'Products';
    }

    openLoginPage() {
        cy.visit('/');
        cy.contains(this.fieldLoginLogo, this.textTitle)
            .should('be.visible');
    }

    fillCredents(username, password) {
        cy.typeOrClear(this.inputUsername, username);
        cy.typeOrClear(this.inputPassword, password);
    }

    submit() {
        cy.get(this.buttonSubmit).click();
    }

    doLogout() {
        cy.get(this.buttonBurgerMenu).click();
        cy.get(this.buttonLogout).click();
    }

    atHome() {
        return cy.contains(this.fieldTitleProducts, this.textProducts)
            .should('be.visible');
    }

    verifyError(message) {
        return cy.contains(this.fieldMsgError, message)
            .should('be.visible');
    }

    getUser(route) {
        return cy.task('getUser', { route });
    }

    doLogin(user) {
        this.openLoginPage();
        this.fillCredents(user.username, user.password);
        this.submit();
        this.atHome();
    }
}

export default new LoginPage;