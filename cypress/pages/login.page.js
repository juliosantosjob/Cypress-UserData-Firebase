import { ELM_LOGIN } from '../elements/login.element';

class LoginPage {

    openLoginPage() {
        cy.visit('/');
        cy.contains(ELM_LOGIN.field.loginLogo, ELM_LOGIN.text.title)
            .should('be.visible');
    }

    fillCredents(username, password) {
        cy.typeOrClear(ELM_LOGIN.input.username, username);
        cy.typeOrClear(ELM_LOGIN.input.password, password);
    }

    submit() {
        cy.get(ELM_LOGIN.button.submit).click();
    }

    doLogout() {
        cy.get(ELM_LOGIN.button.burgerMenu).click();
        cy.get(ELM_LOGIN.button.logout).click();
    }

    atHome() {
        return cy.contains(ELM_LOGIN.field.titleProducts, ELM_LOGIN.text.products)
            .should('be.visible');
    }

    verifyError(message) {
        return cy.contains(ELM_LOGIN.field.msgError, message)
            .should('be.visible');
    }

    getUser(route) {
        return cy.task('getUser', route);
    }

    doLogin(user) {
        this.openLoginPage();
        this.fillCredents(user.username, user.password);
        this.submit();
        this.atHome();
    }
}

export default new LoginPage();
