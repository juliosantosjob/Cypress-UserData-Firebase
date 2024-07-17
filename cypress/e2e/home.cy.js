/// <reference types='cypress' />

import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import { userInfo } from '../support/helpers'
import { productList } from '../fixtures/home';
import homePage from '../pages/home.page';

const rand = Math.floor(Math.random() * productList.length)

describe('Funcionalidade: Home', function () {
    // Pega um produto a partir da lista randomicamente
    const product = productList[rand]

    beforeEach(() => {
        LoginPage.doLogin('standard_user', 'secret_sauce')
    })

    afterEach(() => cy.screenshot())

    it('01 Cenário: Visualiza lista de produtos após login', () => {
        // Valida cada item da lista de produtos
        for (const product of productList) HomePage.displayProductList(product)
    })

    it('02 Cenário: Adicionar Produto ao Carrinho', () => {
        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.productsOnCart(product)
    })

    it('03 Cenário: Remover Produto do Carrinho', () => {
        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.removeProductFromCart(product)
        HomePage.cartIsEmpty()
    })

    it('04 Cenário: Fluxo de Finalização de Compra', () => {
        let user = userInfo()

        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.doCheckout()
        HomePage.formUser(user)
        HomePage.validadeCheckoutOverview(product)
        HomePage.finishPurchase()
        HomePage.verifyPurchaseMessage('Thank you for your order!')
    })

    it('05 Cenário: Adicionar Produto ao Carrinho e Continuar Comprando', () => {
        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.keepShopping()
        LoginPage.atHome()
    })

    it('06 Cenário: Fluxo de compra com nom de usuario em branco', () => {
        let user = userInfo()

        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.doCheckout()

        user.firstName = ''
        HomePage.formUser(user)
        LoginPage.verifyError('Error: First Name is required')
    })

    it('07 Cenário: Fluxo de compra com ultimo nome em branco', () => {
        let user = userInfo()

        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.doCheckout()

        user.lastName = ''
        HomePage.formUser(user)
        LoginPage.verifyError('Error: Last Name is required')
    })

    it('08 Cenário: Fluxo de compra com CEP em branco', () => {
        let user = userInfo()   

        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.doCheckout()

        user.zipCode = ''
        HomePage.formUser(user)
        LoginPage.verifyError('Error: Postal Code is required')
    })

    it('09 Cenário: Fluxo de cancelamento de compra', () => {
        let user = userInfo()

        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.doCheckout()
        HomePage.formUser(user)
        HomePage.validadeCheckoutOverview(product)
        HomePage.cancelPurchase()
        LoginPage.atHome()
    })

    it('10 Cenário: Realiza a compra e volta para a Home', () => {
        let user = userInfo()

        HomePage.doPurchase(product, user)
        homePage.goBackHome()
        LoginPage.atHome()
    })
})