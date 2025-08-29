import creator from "../utils/dataGenerators";
import page from "../../pages-instance";
import items from "../fixtures/home-items";

describe("Funcionalidade: Home", () => {
    let authzUser;
    const {
        product,
        mobile,
        tablet
    } = creator.randomData();

    beforeEach(() => {
        page.login.getUser("authzUser").then((getUser) => {
            console.log(getUser);
            authzUser = getUser;
            page.login.doLogin(authzUser);
        });
    });

    it("01 Cenário: Visualiza lista de produtos após login", () => {
        items.productList.forEach((item) => {
            page.home.displayProductList(item);
        });
    });

    it("02 Cenário: Adicionar Produto ao Carrinho", () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.productsOnCart(product);
    });

    it("03 Cenário: Remover Produto do Carrinho", () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.removeProductFromCart(product);
        page.home.cartIsEmpty();
    });

    it("04 Cenário: Fluxo de Finalização de Compra", () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(authzUser);
        page.home.validadeCheckoutOverview(product);
        page.home.finishPurchase();
        page.home.validateMessage("Thank you for your order!");
    });

    it("05 Cenário: Adicionar Produto ao Carrinho e Continuar Comprando", () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.keepShopping();
        page.login.atHome();
    });

    it("06 Cenário: Fluxo de compra com nom de usuario em branco", () => {
        authzUser.firstName = "";

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(authzUser);
        page.login.verifyError("Error: First Name is required");
    });

    it("07 Cenário: Fluxo de compra com ultimo nome em branco", () => {
        authzUser.lastName = "";

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(authzUser);
        page.login.verifyError("Error: Last Name is required");
    });

    it("08 Cenário: Fluxo de compra com CEP em branco", () => {
        authzUser.zipCode = "";

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(authzUser);
        page.login.verifyError("Error: Postal Code is required");
    });

    it("09 Cenário: Fluxo de cancelamento de compra", () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(authzUser);
        page.home.validadeCheckoutOverview(product);
        page.home.cancelPurchase();
        page.login.atHome();
    });

    it("10 Cenário: Realiza a compra e volta para a Home", () => {
        page.home.doPurchase(product, authzUser);
        page.home.validateMessage("Thank you for your order!");
        page.home.goBackHome();
        page.login.atHome();
    });

    it("11 Cenário: Realizar compra um dispositio mobile",
        mobile.viewport, () => {
            page.home.doPurchase(product, authzUser);
            page.home.validateMessage("Thank you for your order!");
        });

    it("12 Cenário: Realizar compra com dispositivos do tipo tablet",
        tablet.viewport, () => {
            page.home.doPurchase(product, authzUser);
            page.home.validateMessage("Thank you for your order!");
        });
});