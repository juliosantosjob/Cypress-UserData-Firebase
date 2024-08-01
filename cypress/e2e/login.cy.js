/// <reference types='cypress' />

import page from '../../pages-instance';

describe('Funcionalidade: Autenticação', () => {
    let user;

    beforeEach(() => {
        page.login.openLoginPage();
        page.login.getUser('authzUser').then((response) => user = response);
    });

    afterEach(() => {
        cy.screenshot();
    });

    it('01 Cenário: Login com sucesso', () => {
        page.login.fillCredents(user.username, user.password);
        page.login.submit();
        page.login.atHome();
    });

    it('02 Cenário: Login com username inválido', () => {
        page.login.fillCredents('invalid_user', user.password);
        page.login.submit();
        page.login.verifyError(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    it('03 Cenário: Login com password inválido', () => {
        page.login.fillCredents(user.username, 'invalid_password');
        page.login.submit();
        page.login.verifyError(
            'Epic sadface: Username and password do not match any user in this service'
        );
    });

    it('04 Cenário: Login com username vazio', () => {
        page.login.fillCredents('', 'invalid_password');
        page.login.submit();
        page.login.verifyError('Epic sadface: Username is required');
    });

    it('05 Cenário: Login com password vazio', () => {
        page.login.fillCredents('standard_user', '');
        page.login.submit();
        page.login.verifyError('Epic sadface: Password is required');
    });

    it('06 Cenário: Login com formulário vazio', () => {
        page.login.fillCredents('', '');
        page.login.submit();
        page.login.verifyError('Epic sadface: Username is required');
    });

    it('07 Cenário: Login com usuario bloqueado', () => {
        page.login.getUser('lockedUser').then((lockedUser) => {
            page.login.fillCredents(lockedUser.username, lockedUser.password);
            page.login.submit();
            page.login.verifyError('Epic sadface: Sorry, this user has been locked out.');
        });
    });

    it('08 Cenário: Logout do Usuário ', () => {
        page.login.doLogin(user);
        page.login.doLogout();
        page.login.openLoginPage();
    });
});