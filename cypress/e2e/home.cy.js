/// <reference types='cypress' />

import creator from '../utils/dataGenerators';
import page from '../../pages-instance';

describe('Funcionalidade: Home', () => {
    const data = creator.generateData();
    const { product, user } = data.random;

    beforeEach(() => {
        page.login.getUser('authzUser').then((authzUser) => {
            page.login.doLogin(authzUser);
        });
    });

    afterEach(() => cy.screenshot());

    it('01 Cenário: Visualiza lista de produtos após login', () => {
        for (const product of data.static.product) {
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
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.home.validadeCheckoutOverview(product);
        page.home.finishPurchase();
        page.home.validateMessage('Thank you for your order!');
    });

    it('05 Cenário: Adicionar Produto ao Carrinho e Continuar Comprando', () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.keepShopping();
        page.login.atHome();
    });

    it('06 Cenário: Fluxo de compra com nom de usuario em branco', () => {
        let data = creator.generateData();
        data.random.user.firstName = '';

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(data.random.user);
        page.login.verifyError('Error: First Name is required');
    });

    it('07 Cenário: Fluxo de compra com ultimo nome em branco', () => {
        let data = creator.generateData();
        data.random.user.lastName = '';
        
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(data.random.user);
        page.login.verifyError('Error: Last Name is required');
    });

    it('08 Cenário: Fluxo de compra com CEP em branco', () => {
        let data = creator.generateData();
        data.random.user.zipCode = '';

        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(data.random.user);
        page.login.verifyError('Error: Postal Code is required');
    });

    it('09 Cenário: Fluxo de cancelamento de compra', () => {
        page.home.addProductToCart(product);
        page.home.goToCart();
        page.home.doCheckout();
        page.home.formUser(user);
        page.home.validadeCheckoutOverview(product);
        page.home.cancelPurchase();
        page.login.atHome();
    });

    it('10 Cenário: Realiza a compra e volta para a Home', () => {
        page.home.doPurchase(product, user);
        page.home.validateMessage('Thank you for your order!');
        page.home.goBackHome();
        page.login.atHome();
    });

    it('11 Cenário: Realizar compra um dispositio mobile',
        data.random['mobile'].viewport, () => {
            page.home.doPurchase(product, user);
            page.home.validateMessage('Thank you for your order!');
        });

    it('12 Cenário: Realizar compra com dispositivos do tipo tablet',
        data.random['tablet'].viewport, () => {
            page.home.doPurchase(product, user);
            page.home.validateMessage('Thank you for your order!');
        });
});
