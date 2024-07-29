import { ELM_HOME } from '../elements/home.element.js';

class HomePage {

    addProductToCart(product) {
        cy.contains(ELM_HOME.fieldInventoryItemName, product)
            .parents(ELM_HOME.fieldinventoryItem).as('product');

        cy.get('@product')
            .find(ELM_HOME.fieldInventoryItemPrice)
            .invoke('text')
            .as('productPrice');

        cy.get('@product')
            .find(ELM_HOME.buttonAddToCard)
            .click();
    }

    goToCart() {
        cy.get(ELM_HOME.buttonShoppingCart).click();
    }

    removeProductFromCart(product) {
        cy.contains(ELM_HOME.fieldInventoryItemName, product)
            .parents(ELM_HOME.fieldinventoryItem)
            .find(ELM_HOME.buttonRemove)
            .click();
    }

    doCheckout() {
        cy.get(ELM_HOME.buttonCheckout).click();
    }

    formUser(user) {
        cy.typeOrClear(ELM_HOME.inputFirstName, user.firstName, { log: false });
        cy.typeOrClear(ELM_HOME.inputLastName, user.lastName, { log: false });
        cy.typeOrClear(ELM_HOME.inputZipCode, user.zipCode, { log: false });
        cy.get(ELM_HOME.buttonSubmit).click();
    }

    finishPurchase() {
        cy.get(ELM_HOME.buttonFinish).click();
    }

    keepShopping() {
        cy.get(ELM_HOME.buttonKeepShopping).click();
    }

    cancelPurchase() {
        cy.get(ELM_HOME.buttonCancel).click();
    }

    goBackHome() {
        cy.get(ELM_HOME.buttonBackToProducts).click();
    }

    displayProductList(product) {
        return cy.contains(ELM_HOME.fieldInventoryItemName, product)
            .should('exist')
            .and('be.visible');
    }

    verifyPurchaseMessage(message) {
        return cy.contains(ELM_HOME.fieldCompleteHeader, message)
            .should('be.visible');
    }

    validadeCheckoutOverview(product) {
        return cy.get('@productPrice').then((price) => {
            cy.contains(ELM_HOME.fieldinventoryItem, product)
                .should('be.visible');
            cy.contains(ELM_HOME.fieldInventoryItemPrice, price)
                .should('be.visible');
        });
    }

    productsOnCart(product) {
        return cy.contains(ELM_HOME.fieldCartList, product)
            .should('exist')
            .and('be.visible');
    }

    cartIsEmpty() {
        return cy.get(ELM_HOME.fieldCardBadge)
            .should('not.exist');
    }

    doPurchase(product, userInfo) {
        this.addProductToCart(product);
        this.goToCart();
        this.doCheckout();
        this.formUser(userInfo);
        this.validadeCheckoutOverview(product);
        this.finishPurchase();
        this.verifyPurchaseMessage('Thank you for your order!');
    }
}

export default new HomePage;