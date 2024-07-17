/// <reference types='cypress' />

import LoginPage from '../pages/login.page'
import HomePage from '../pages/home.page'
import { userInfo } from '../support/helpers'
import { productList } from '../fixtures/home';

const rand = Math.floor(Math.random() * productList.length)

describe('Home', function () {
    // Pega um produto a partir da lista randomicamente
    const product = productList[rand]

    beforeEach(() => {
        LoginPage.doLogin('standard_user', 'secret_sauce')
    })

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
        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.doCheckout()
        HomePage.setUserInfo(userInfo)
        HomePage.validadeCheckoutOverview(product)
        HomePage.finishPurchase()
        HomePage.verifyPurchaseMessage('Thank you for your order!')
    })

    it('05 Cenário: Adicionar Produto ao Carrinho e Continuar Comprando', () => {
        HomePage.addProductToCart(product)
        HomePage.goToCart()
        HomePage.keepShopping()
        LoginPage.beLogged()
    })
})