import { ELM_LOGIN } from '../elements/login.element';

class LoginPage {

    openLoginPage() {
        cy.visit('/');
        cy.contains(ELM_LOGIN.fieldLoginLogo, ELM_LOGIN.textTitle)
            .should('be.visible');
    }

    fillCredents(username, password) {
        cy.typeOrClear(ELM_LOGIN.inputUsername, username);
        cy.typeOrClear(ELM_LOGIN.inputPassword, password);
    }

    submit() {
        cy.get(ELM_LOGIN.buttonSubmit).click();
    }

    doLogout() {
        cy.get(ELM_LOGIN.buttonBurgerMenu).click();
        cy.get(ELM_LOGIN.buttonLogout).click();
    }

    atHome() {
        return cy.contains(ELM_LOGIN.fieldTitleProducts, ELM_LOGIN.textProducts)
            .should('be.visible');
    }

    verifyError(message) {
        return cy.contains(ELM_LOGIN.fieldMsgError, message)
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