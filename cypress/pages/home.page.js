class HomePage {

    constructor() {
        this.productValue = ''
    }

    /* Metodos de Ação */

    addProductToCart(product) {
        cy.contains('[data-test="inventory-item-name"]', product)
            .parents('[data-test="inventory-item"]').as('currentProduct')

        cy.get('@currentProduct')
            .find('[data-test="inventory-item-price"]').then(($price) =>
                this.productValue = $price.text())

        cy.get('@currentProduct').find('[name*="add-to-cart"]')
            .click()
    }

    goToCart() {
        cy.get('[data-test="shopping-cart-link"]')
            .click()
    }

    removeProductFromCart(product) {
        cy.contains('[data-test="inventory-item-name"]', product)
            .parents('[data-test="inventory-item"]')
            .find('[data-test*="remove"]')
            .click()
    }

    doCheckout() {
        cy.get('#checkout').click()
    }

    setUserInfo(userInfo) {
        cy.get('[data-test="firstName"]').type(userInfo.firstName)
        cy.get('[data-test="lastName"]').type(userInfo.lastName)
        cy.get('[data-test="postalCode"]').type(userInfo.zipCode)
        cy.get('[type="submit"]').click()
    }

    finishPurchase() {
        cy.get('[data-test="finish"]').click()
    }

    keepShopping() {
        cy.get('[data-test="continue-shopping"]').click()
        
    }

    /* Metodos de validação */

    verifyPurchaseMessage(message) {
        return cy.contains('[data-test="complete-header"]', message)
            .should('be.visible')
    }

    validadeCheckoutOverview(product) {
        return cy.wrap(this).then((get) => {
            cy.contains('[data-test="inventory-item"]', product).should('be.visible')
            cy.contains('.item_pricebar', get.productValue).should('be.visible')
        })
    }

    displayProductList(product) {
        return cy.contains('[data-test="inventory-item-name"]', product)
            .should('be.visible')
    }

    productsOnCart(product) {
        return cy.contains('[data-test="cart-list"]', product)
            .should('be.visible')
    }

    cartIsEmpty() {
        return cy.get('[data-test="shopping-cart-badge"]')
            .should('not.exist')
    }

    /* Metodos de suporte  */

    doPurchase(product, userInfo) {
        this.doCheckout()
        this.setUserInfo(userInfo)
        this.validadeCheckoutOverview(product)
        this.finishPurchase()
        this.verifyPurchaseMessage('Thank you for your order!')
    }
}

export default new HomePage()