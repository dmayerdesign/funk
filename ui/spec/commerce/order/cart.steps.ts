import { givenACustomer, givenThatASkuWasAddedToTheCart } from "@funk/ui/spec/commerce/helpers"
import { background, example, rule } from "@funk/ui/spec/helpers"

rule("A user must have quick access to their cart anywhere in the Commerce app.", function () {
  background(function () {
    givenACustomer("Newt")
    givenThatASkuWasAddedToTheCart()
  })

  example("Basic details of Newt's cart are visible while they browse the Commerce app.", function () {
    cy.get("product-list-item").first().should("contain.text", "Rollerblades")
  })
})
