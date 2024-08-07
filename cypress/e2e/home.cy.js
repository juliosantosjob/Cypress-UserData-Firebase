/// <reference types='cypress' />

import data from '../utils/dataGenerators';
import page from '../../pages-instance';
import products from '../fixtures/home-items';

describe('Funcionalidade: Home', () => {
    const item = data.randItems();

    beforeEach(() => {
        page.login.getUser('authzUser').then((authzUser) => {
            page.login.doLogin(authzUser);
        });
    });

    afterEach(() => cy.screenshot());

    it('01 Cenário: Visualiza lista de produtos após login', () => {
        for (const product of products.productList) {
            page.home.displayProductList(product);
        }
    });

    it('02 Cenário: Adicionar Produto ao Carrinho', () => {
        page.home.addProductToCart(item.product);
        page.home.goToCart();
        page.home.productsOnCart(item.product);
    });

    it('03 Cenário: Remover Produto do Carrinho', () => {
        page.home.addProductToCart(item.product);
        page.home.goToCart();
        page.home.removeProductFromCart(item.product);
        page.home.cartIsEmpty();
    });

    it('04 Cenário: Fluxo de Finalização de Compra', () => {
        let user = data.newUser();

        page.home.addProductToCart(item.product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.home.validadeCheckoutOverview(item.product);
        page.home.finishPurchase();
        page.home.validateMessage('Thank you for your order!');
    });

    it('05 Cenário: Adicionar Produto ao Carrinho e Continuar Comprando', () => {
        page.home.addProductToCart(item.product);
        page.home.goToCart();
        page.home.keepShopping();
        page.login.atHome();
    });

    it('06 Cenário: Fluxo de compra com nom de usuario em branco', () => {
        let user = data.newUser();
        user.firstName = '';

        page.home.addProductToCart(item.product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.login.verifyError('Error: First Name is required');
    });

    it('07 Cenário: Fluxo de compra com ultimo nome em branco', () => {
        let user = data.newUser();
        user.lastName = '';

        page.home.addProductToCart(item.product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.login.verifyError('Error: Last Name is required');
    });

    it('08 Cenário: Fluxo de compra com CEP em branco', () => {
        let user = data.newUser();
        user.zipCode = '';

        page.home.addProductToCart(item.product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.login.verifyError('Error: Postal Code is required');
    });

    it('09 Cenário: Fluxo de cancelamento de compra', () => {
        let user = data.newUser();

        page.home.addProductToCart(item.product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.home.validadeCheckoutOverview(item.product);
        page.home.cancelPurchase();
        page.login.atHome();
    });

    it('10 Cenário: Realiza a compra e volta para a Home', () => {
        let user = data.newUser();

        page.home.doPurchase(item.product, user);
        page.home.validateMessage('Thank you for your order!');
        page.home.goBackHome();
        page.login.atHome();
    });

    it('11 Cenário: Realizar compra um dispositio mobile',
        item.mobile.viewport, () => {
            let user = data.newUser();

            page.home.doPurchase(item.product, user);
            page.home.validateMessage('Thank you for your order!');
        });

    it('12 Cenário: Realizar compra com dispositivos do tipo tablet',
        item.tablet.viewport, () => {
            let user = data.newUser();

            page.home.doPurchase(item.product, user);
            page.home.validateMessage('Thank you for your order!');
        });
});
