import { givenACustomerAndThatASkuWasAddedToTheCart } from "@funk/test/helpers/external/commerce/helpers"
import { background, example, rule } from "@funk/test/helpers/external/helpers"

rule(
  "A user must have quick access to their cart anywhere in the Commerce app.",
  () => {
    background(() => {
      givenACustomerAndThatASkuWasAddedToTheCart("Newt")
    })

    example(
      "Basic details of Newt's cart are visible while they browse the Commerce app.",
      () => {
        cy.get(".checkout-button").should("contain.text", "(1)")
      },
    )
  },
)
