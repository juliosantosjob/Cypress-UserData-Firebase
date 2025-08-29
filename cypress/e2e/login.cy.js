import page from "../../pages-instance";

describe("Funcionalidade: Autenticação", () => {
    let authzUser;

    beforeEach(() => {
        page.login.openLoginPage();
        page.login.getUser("authzUser").then(getUser => authzUser = getUser);
    });

    it("01 Cenário: Login com sucesso", () => {
        page.login.fillCredents(authzUser);
        page.login.submit();
        page.login.atHome();
    });

    it("02 Cenário: Login com username inválido", () => {
        authzUser.username = "invalid_username";

        page.login.fillCredents(authzUser);
        page.login.submit();
        page.login.verifyError(
            "Epic sadface: Username and password do not match any user in this service"
        );
    });

    it("03 Cenário: Login com password inválido", () => {
        authzUser.password = "invalid_password";

        page.login.fillCredents(authzUser);
        page.login.submit();
        page.login.verifyError(
            "Epic sadface: Username and password do not match any user in this service"
        );
    });

    it("04 Cenário: Login com username vazio", () => {
        authzUser.username = "";

        page.login.fillCredents(authzUser);
        page.login.submit();
        page.login.verifyError("Epic sadface: Username is required");
    });

    it("05 Cenário: Login com password vazio", () => {
        authzUser.password = "";

        page.login.fillCredents(authzUser);
        page.login.submit();
        page.login.verifyError("Epic sadface: Password is required");
    });

    it("06 Cenário: Login com formulário vazio", () => {
        authzUser.username = "";
        authzUser.password = "";

        page.login.fillCredents(authzUser);
        page.login.submit();
        page.login.verifyError("Epic sadface: Username is required");
    });

    it("07 Cenário: Login com usuario bloqueado", () => {
        page.login.getUser("lockedUser").then((lockedUser) => {
            page.login.fillCredents(lockedUser);
            page.login.submit();
            page.login.verifyError("Epic sadface: Sorry, this user has been locked out.");
        });
    });

    it("08 Cenário: Logout do Usuário ", () => {
        page.login.doLogin(authzUser);
        page.login.doLogout();
        page.login.openLoginPage();
    });
});
