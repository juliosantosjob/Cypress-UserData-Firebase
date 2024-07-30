/// <reference types='cypress' />

import { mobile, tablet } from '../fixtures/screen-resolutions';

import { newUser, getRandomValue } from '../utils/dataGenerators';
import { productList } from '../fixtures/itens-home';

import LoginPage from '../pages/login.page';
import HomePage from '../pages/home.page';

const product = getRandomValue({ array: productList });
const smartphone = getRandomValue({ array: mobile });
const tab = getRandomValue({ array: tablet });

describe('Funcionalidade: Home', () => {

    beforeEach(() => {
        LoginPage.getUser('authzUser').then((authzUser) => {
            LoginPage.doLogin(authzUser);
        });
    });

    afterEach(() => {
        cy.screenshot();
    });

    it.only('01 Cenário: Visualiza lista de produtos após login', () => {
        for (const product of productList) {
            HomePage.displayProductList(product);
        }
    });

    it('02 Cenário: Adicionar Produto ao Carrinho', () => {
        HomePage.addProductToCart(product);
        HomePage.goToCart();
        HomePage.productsOnCart(product);
    });

    it('03 Cenário: Remover Produto do Carrinho', () => {
        HomePage.addProductToCart(product);
        HomePage.goToCart();
        HomePage.removeProductFromCart(product);
        HomePage.cartIsEmpty();
    });

    it('04 Cenário: Fluxo de Finalização de Compra', () => {
        let user = newUser();

        HomePage.addProductToCart(product);
        HomePage.goToCart();
        HomePage.doCheckout();
        HomePage.formUser(user);
        HomePage.validadeCheckoutOverview(product);
        HomePage.finishPurchase();
        HomePage.verifyPurchaseMessage('Thank you for your order!');
    });

    it('05 Cenário: Adicionar Produto ao Carrinho e Continuar Comprando', () => {
        HomePage.addProductToCart(product);
        HomePage.goToCart();
        HomePage.keepShopping();
        LoginPage.atHome();
    });

    it('06 Cenário: Fluxo de compra com nom de usuario em branco', () => {
        let user = newUser();
        user.firstName = '';

        HomePage.addProductToCart(product);
        HomePage.goToCart();
        HomePage.doCheckout();
        HomePage.formUser(user);
        LoginPage.verifyError('Error: First Name is required');
    });

    it('07 Cenário: Fluxo de compra com ultimo nome em branco', () => {
        let user = newUser();
        user.lastName = '';

        HomePage.addProductToCart(product);
        HomePage.goToCart();
        HomePage.doCheckout();
        HomePage.formUser(user);
        LoginPage.verifyError('Error: Last Name is required');
    });

    it('08 Cenário: Fluxo de compra com CEP em branco', () => {
        let user = newUser();
        user.zipCode = '';

        HomePage.addProductToCart(product);
        HomePage.goToCart();
        HomePage.doCheckout();
        HomePage.formUser(user);
        LoginPage.verifyError('Error: Postal Code is required');
    });

    it('09 Cenário: Fluxo de cancelamento de compra', () => {
        let user = newUser();

        HomePage.addProductToCart(product);
        HomePage.goToCart();
        HomePage.doCheckout();
        HomePage.formUser(user);
        HomePage.validadeCheckoutOverview(product);
        HomePage.cancelPurchase();
        LoginPage.atHome();
    });

    it('10 Cenário: Realiza a compra e volta para a Home', () => {
        let user = newUser();

        HomePage.doPurchase(product, user);
        HomePage.verifyPurchaseMessage('Thank you for your order!');
        HomePage.goBackHome();
        LoginPage.atHome();
    });

    it('11 Cenário: Realizar compra com de dispositivos mobile', smartphone.viewport, () => {
        let user = newUser();

        HomePage.doPurchase(product, user);
        HomePage.verifyPurchaseMessage('Thank you for your order!');
    });

    it('12 Cenário: Realizar compra dispositivos do tipo tablet', tab.viewport, () => {
        let user = newUser();

        HomePage.doPurchase(product, user);
        HomePage.verifyPurchaseMessage('Thank you for your order!');
    });
});