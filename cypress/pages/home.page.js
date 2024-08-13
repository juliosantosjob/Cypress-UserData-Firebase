import { ELM_HOME } from "../elements/home.element.js";

class HomePage {

    addProductToCart(product) {
        cy.contains(ELM_HOME.field.inventoryItemName, product)
            .parents(ELM_HOME.field.inventoryItem).as("product");

        cy.get("@product") // Get product price and insert into variable
            .find(ELM_HOME.field.inventoryItemPrice)
            .invoke("text")
            .as("productPrice");

        cy.get("@product")
            .find(ELM_HOME.button.addToCard)
            .click();
    }

    goToCart() {
        cy.get(ELM_HOME.button.shoppingCart).click();
    }

    removeProductFromCart(product) {
        cy.contains(ELM_HOME.field.inventoryItemName, product)
            .parents(ELM_HOME.field.inventoryItem)
            .find(ELM_HOME.button.remove)
            .click();
    }

    doCheckout() {
        cy.get(ELM_HOME.button.checkout).click();
    }

    formUser(user) {
        cy.typeOrClear(ELM_HOME.input.firstName, user.firstName);
        cy.typeOrClear(ELM_HOME.input.lastName, user.lastName);
        cy.typeOrClear(ELM_HOME.input.zipCode, user.zipCode);
        cy.get(ELM_HOME.button.submit).click();
    }

    finishPurchase() {
        cy.get(ELM_HOME.button.finish).click();
    }

    keepShopping() {
        cy.get(ELM_HOME.button.keepShopping).click();
    }

    cancelPurchase() {
        cy.get(ELM_HOME.button.cancel).click();
    }

    goBackHome() {
        cy.get(ELM_HOME.button.backToProducts).click();
    }

    displayProductList(product) {
        cy.contains(ELM_HOME.field.inventoryItemName, product)
            .should("exist")
            .and("be.visible");
    }

    validateMessage(message) {
        cy.contains(ELM_HOME.field.completeHeader, message)
            .should("be.visible");
    }

    validadeCheckoutOverview(product) {
        cy.get("@productPrice").then((price) => {
            cy.contains(ELM_HOME.field.inventoryItem, product)
                .should("be.visible");
            cy.contains(ELM_HOME.field.inventoryItemPrice, price)
                .should("be.visible");
        });
    }

    productsOnCart(product) {
        cy.contains(ELM_HOME.field.cartList, product)
            .should("exist")
            .and("be.visible");
    }

    cartIsEmpty() {
        cy.get(ELM_HOME.field.cardBadge)
            .should("not.exist");
    }

    doPurchase(product, userInfo) {
        this.addProductToCart(product);
        this.goToCart();
        this.doCheckout();
        this.formUser(userInfo);
        this.validadeCheckoutOverview(product);
        this.finishPurchase();
    }
}

export default new HomePage();