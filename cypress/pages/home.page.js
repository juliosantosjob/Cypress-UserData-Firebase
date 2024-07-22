class HomePage {

    /**
     * Construtor com os localizadores para centralizar 
     * os elementos e reaproveitar os mesmos em metodos
     * diferentes, estão definidos em ordem alfabetica
     */

    constructor() {
        this.buttonAddToCard = '[name*="add-to-cart"]'
        this.buttonBackToProducts = '[data-test="back-to-products"]'
        this.buttonCancel = '[data-test="cancel"]'
        this.buttonCheckout = '#checkout'
        this.buttonFinish = '[data-test="finish"]'
        this.buttonKeepShopping = '[data-test="continue-shopping"]'
        this.buttonRemove = '[data-test*="remove"]'
        this.buttonShoppingCart = '[data-test="shopping-cart-link"]'
        this.buttonSubmit = '[type="submit"]'
        this.fieldCardBadge = '[data-test="shopping-cart-badge"]'
        this.fieldCartList = '[data-test="cart-list"]'
        this.fieldCompleteHeader = '[data-test="complete-header"]'
        this.fieldInventoryItemName = '[data-test="inventory-item-name"]'
        this.fieldInventoryItemPrice = '[data-test="inventory-item-price"]'
        this.fieldinventoryItem = '[data-test="inventory-item"]'
        this.inputFirstName = '[data-test="firstName"]'
        this.inputLastName = '[data-test="lastName"]'
        this.inputZipCode = '[data-test="postalCode"]'
        this.valueProduct = ''
    }

    /* Metodos de Ação */

    addProductToCart(product) {
        cy.contains(this.fieldInventoryItemName, product)
            .parents(this.fieldinventoryItem)
            .as('product')

        cy.get('@product')
            .find(this.fieldInventoryItemPrice)
            .then(($price) => this.valueProduct = $price.text()) 
            // Obtenho o valor do produto e salvo o mesmo na variável "valueProduct"

        cy.get('@product')
            .find(this.buttonAddToCard)
            .click()
    }

    goToCart() {
        cy.get(this.buttonShoppingCart)
            .click()
    }

    removeProductFromCart(product) {
        cy.contains(this.fieldInventoryItemName, product)
            .parents(this.fieldinventoryItem)
            .find(this.buttonRemove)
            .click()
    }

    doCheckout() {
        cy.get(this.buttonCheckout).click()
    }

    formUser(user) {
        cy.typeOrClear(this.inputFirstName, user.firstName)
        cy.typeOrClear(this.inputLastName, user.lastName)
        cy.typeOrClear(this.inputZipCode, user.zipCode)
        cy.get(this.buttonSubmit).click()
    }

    finishPurchase() {
        cy.get(this.buttonFinish).click()
    }

    keepShopping() {
        cy.get(this.buttonKeepShopping).click()
    }

    cancelPurchase() {
        cy.get(this.buttonCancel).click()
    }

    goBackHome() {
        cy.get(this.buttonBackToProducts).click()
    }

    /* Metodos de validação */

    verifyPurchaseMessage(message) {
        return cy.contains(this.fieldCompleteHeader, message)
            .should('be.visible')
    }

    validadeCheckoutOverview(product) {
        return cy.wrap(this).then((get) => {
            cy.contains(this.fieldinventoryItem, product)
                .should('be.visible')
            cy.contains(this.fieldInventoryItemPrice, get.valueProduct)
                .should('be.visible') // verifica o valor do produto
        })
    }

    displayProductList(product) {
        return cy.contains(this.fieldInventoryItemName, product)
            .should('exist')
            .and('be.visible')
    }

    productsOnCart(product) {
        return cy.contains(this.fieldCartList, product)
            .should('exist')
            .and('be.visible')
    }

    cartIsEmpty() {
        return cy.get(this.fieldCardBadge)
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