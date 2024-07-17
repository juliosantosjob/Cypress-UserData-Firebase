import LoginPage from '../pages/login.page'

class HomePage {

    /**
     * Construtor com os localizadores para centralizar 
     * os elementos e reaproveitar os mesmos em metodos
     * diferentes, estão definidos em ordem alfabetica
     */
    
    constructor() {
        this.btnAddToCard = '[name*="add-to-cart"]'
        this.btnBackToProducts = '[data-test="back-to-products"]'
        this.btnCancel = '[data-test="cancel"]'
        this.btnCheckout = '#checkout'
        this.btnFinish = '[data-test="finish"]'
        this.btnKeepShopping = '[data-test="continue-shopping"]'
        this.btnRemove = '[data-test*="remove"]'
        this.btnShoppingCart = '[data-test="shopping-cart-link"]'
        this.btnSubmit = '[type="submit"]'
        
        this.fldCardBadge = '[data-test="shopping-cart-badge"]'
        this.fldCartList = '[data-test="cart-list"]'
        this.fldCompleteHeader = '[data-test="complete-header"]'
        this.fldInventoryItemName = '[data-test="inventory-item-name"]'
        this.fldInventoryItemPrice = '[data-test="inventory-item-price"]'
        this.fldinventoryItem = '[data-test="inventory-item"]'

        this.iptFirstName = '[data-test="firstName"]'
        this.iptLastName = '[data-test="lastName"]'
        this.iptZipCode = '[data-test="postalCode"]'
        
        this.vltProduct = ''
    }

    /* Metodos de Ação */
    addProductToCart(product) {
        cy.contains(this.fldInventoryItemName, product)
            .parents(this.fldinventoryItem)
            .as('product')

        cy.get('@product')
            .find(this.fldInventoryItemPrice).then(($price) =>
                this.vltProduct = $price.text()) // pega o valor do produto e salva na variável

        cy.get('@product')
            .find(this.btnAddToCard)
            .click()
    }

    goToCart() {
        cy.get(this.btnShoppingCart)
            .click()
    }

    removeProductFromCart(product) {
        cy.contains(this.fldInventoryItemName, product)
            .parents(this.fldinventoryItem)
            .find(this.btnRemove)
            .click()
    }

    doCheckout() {
        cy.get(this.btnCheckout).click()
    }

    formUser(user) {
        user.firstName === ''
            ? cy.get(this.iptFirstName).clear()
            : cy.get(this.iptFirstName).type(user.firstName)

        user.lastName === ''
            ? cy.get(this.iptLastName).clear()
            : cy.get(this.iptLastName).type(user.lastName)

        user.zipCode === ''
            ? cy.get(this.iptZipCode).clear()
            : cy.get(this.iptZipCode).type(user.zipCode)

        cy.get(this.btnSubmit).click()
    }

    finishPurchase() {
        cy.get(this.btnFinish).click()
    }

    keepShopping() {
        cy.get(this.btnKeepShopping).click()
    }

    cancelPurchase() {
        cy.get(this.btnCancel).click()
    }

    goBackHome() {
        cy.get(this.btnBackToProducts).click()
    }

    /* Metodos de validação */
    verifyPurchaseMessage(message) {
        return cy.contains(this.fldCompleteHeader, message)
            .should('be.visible')
    }

    validadeCheckoutOverview(product) {
        return cy.wrap(this).then((get) => {
            cy.contains(this.fldinventoryItem, product)
                .should('be.visible')
            cy.contains(this.fldInventoryItemPrice, get.vltProduct)
                .should('be.visible') // verifica o valor do produto
        })
    }

    displayProductList(product) {
        return cy.contains(this.fldInventoryItemName, product)
            .should('exist')
            .and('be.visible')
    }

    productsOnCart(product) {
        return cy.contains(this.fldCartList, product)
            .should('exist')
            .and('be.visible')
    }

    cartIsEmpty() {
        return cy.get(this.fldCardBadge)
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