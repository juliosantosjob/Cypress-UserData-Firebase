import { ELM_LOGIN } from "../elements/login.element";

class LoginPage {

    openLoginPage() {
        cy.visit("/");
        cy.contains(ELM_LOGIN.field.loginLogo, ELM_LOGIN.text.title)
            .should("be.visible");
    }

    fillCredents(user) {
        cy.typeOrClear(ELM_LOGIN.input.username, user.username);
        cy.typeOrClear(ELM_LOGIN.input.password, user.password);
    }

    submit() {
        cy.get(ELM_LOGIN.button.submit).click();
    }

    doLogout() {
        cy.get(ELM_LOGIN.button.burgerMenu).click();
        cy.get(ELM_LOGIN.button.logout).click();
    }

    atHome() {
        cy.contains(ELM_LOGIN.field.titleProducts, ELM_LOGIN.text.products)
            .should("be.visible");
    }

    verifyError(message) {
        cy.contains(ELM_LOGIN.field.msgError, message)
            .should("be.visible");
    }

    getUser(route) {
        return cy.task("getUser", route);
    }

    doLogin(user) {
        this.openLoginPage();
        this.fillCredents(user);
        this.submit();
        this.atHome();
    }
}

export default new LoginPage();
