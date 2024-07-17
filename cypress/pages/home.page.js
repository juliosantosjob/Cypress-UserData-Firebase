import LoginPage from '../pages/login.page'

class HomePage {

    constructor() {
        this.productValue = ''
        this.fldInventoryItemName = '[data-test="inventory-item-name"]'
        this.fldinventoryItem = '[data-test="inventory-item"]'
    }

    /* Metodos de Ação */
    addProductToCart(product) {
        cy.contains(this.fldInventoryItemName, product)
            .parents(this.fldinventoryItem)
            .as('getProduct')

        cy.get('@getProduct')
            .find('[data-test="inventory-item-price"]').then(($price) =>
                this.productValue = $price.text()) // pega o valor do produto e salva na variável

        cy.get('@getProduct')
            .find('[name*="add-to-cart"]')
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

    formUser(user) {
        user.firstName === ''
            ? cy.get('[data-test="firstName"]').clear()
            : cy.get('[data-test="firstName"]').type(user.firstName)

        user.lastName === ''
            ? cy.get('[data-test="lastName"]').clear()
            : cy.get('[data-test="lastName"]').type(user.lastName)

        user.zipCode === ''
            ? cy.get('[data-test="postalCode"]').clear()
            : cy.get('[data-test="postalCode"]').type(user.zipCode)

        cy.get('[type="submit"]').click()
    }

    finishPurchase() {
        cy.get('[data-test="finish"]').click()
    }

    keepShopping() {
        cy.get('[data-test="continue-shopping"]').click()
    }

    cancelPurchase() {
        cy.get('[data-test="cancel"]').click()
    }

    goBackHome() {
        cy.get('[data-test="back-to-products"]').click()
        
    }

    /* Metodos de validação */
    verifyPurchaseMessage(message) {
        return cy.contains('[data-test="complete-header"]', message)
            .should('be.visible')
    }

    validadeCheckoutOverview(product) {
        return cy.wrap(this).then((get) => {
            cy.contains('[data-test="inventory-item"]', product)
                .should('be.visible')
            cy.contains('.item_pricebar', get.productValue)
                .should('be.visible') // verifica o valor do produto
        })
    }

    displayProductList(product) {
        return cy.contains('[data-test="inventory-item-name"]', product)
            .should('exist')
            .and('be.visible')
    }

    productsOnCart(product) {
        return cy.contains('[data-test="cart-list"]', product)
            .should('exist')
            .and('be.visible')
    }

    cartIsEmpty() {
        return cy.get('[data-test="shopping-cart-badge"]')
            .should('not.exist')
    }

    /* Metodos de suporte  */
    doPurchase(product, userInfo) {
        this.addProductToCart(product)
        this.goToCart()
        this.doCheckout()
        this.formUser(userInfo)
        this.validadeCheckoutOverview(product)
        this.finishPurchase()
        this.verifyPurchaseMessage('Thank you for your order!')
    }
}

export default new HomePage()