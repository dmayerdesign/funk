Feature: Sales tax

  Rule: Sales tax is calculated for any Order where the primary Enterprise has nexus

    Example: The Enterprise has nexus in the same state as the Customer

      Given an Order where the Customer has a shipping address in Florida
      And that the primary Enterprise has sales tax nexus in Florida
      When the Order enters the CART_CHECKOUT status
      Then the sales tax is calculated and communicated to the Customer

    Example: The Enterprise DOES NOT have nexus in the same state as the Customer

      Given an Order where the Customer has a shipping address in Michigan
      And that the primary Enterprise has sales tax nexus in Florida
      When the Order is submitted
      Then the sales tax is calculated to be 0
