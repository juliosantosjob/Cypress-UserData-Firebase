/// <reference types='cypress' />

import { mobile, tablet } from '../fixtures/screen-resolutions';
import { productList } from '../fixtures/itens-home';

import { newUser, getRandomValue } from '../utils/dataGenerators';
import page from '../../pages-instance';

const product = getRandomValue({ array: productList });
const smartphone = getRandomValue({ array: mobile });
const tab = getRandomValue({ array: tablet });

describe('Funcionalidade: Home', () => {

    beforeEach(() => {
        page.login.getUser('authzUser').then((authzUser) => {
            page.login.doLogin(authzUser);
        });
    });

    afterEach(() => {
        cy.screenshot();
    });

    it('01 Cenário: Visualiza lista de produtos após login', () => {
        for (const product of productList) {
            page.home.displayProductList(product);
        }
    });

    it('02 Cenário: Adicionar Produto ao Carrinho', () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.productsOnCart(product);
    });

    it('03 Cenário: Remover Produto do Carrinho', () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.removeProductFromCart(product);
        page.home.cartIsEmpty();
    });

    it('04 Cenário: Fluxo de Finalização de Compra', () => {
        let user = newUser();

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.home.validadeCheckoutOverview(product);
        page.home.finishPurchase();
        page.home.verifyPurchaseMessage('Thank you for your order!');
    });

    it('05 Cenário: Adicionar Produto ao Carrinho e Continuar Comprando', () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.keepShopping();
        page.login.atHome();
    });

    it('06 Cenário: Fluxo de compra com nom de usuario em branco', () => {
        let user = newUser();
        user.firstName = '';

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.login.verifyError('Error: First Name is required');
    });

    it('07 Cenário: Fluxo de compra com ultimo nome em branco', () => {
        let user = newUser();
        user.lastName = '';

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.login.verifyError('Error: Last Name is required');
    });

    it('08 Cenário: Fluxo de compra com CEP em branco', () => {
        let user = newUser();
        user.zipCode = '';

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.login.verifyError('Error: Postal Code is required');
    });

    it('09 Cenário: Fluxo de cancelamento de compra', () => {
        let user = newUser();

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.home.validadeCheckoutOverview(product);
        page.home.cancelPurchase();
        page.login.atHome();
    });

    it('10 Cenário: Realiza a compra e volta para a Home', () => {
        let user = newUser();

        page.home.doPurchase(product, user);
        page.home.verifyPurchaseMessage('Thank you for your order!');
        page.home.goBackHome();
        page.login.atHome();
    });

    it('11 Cenário: Realizar compra com de dispositivos mobile', smartphone.viewport, () => {
        let user = newUser();

        page.home.doPurchase(product, user);
        page.home.verifyPurchaseMessage('Thank you for your order!');
    });

    it('12 Cenário: Realizar compra dispositivos do tipo tablet', tab.viewport, () => {
        let user = newUser();

        page.home.doPurchase(product, user);
        page.home.verifyPurchaseMessage('Thank you for your order!');
    });
});