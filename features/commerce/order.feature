Feature: Order

Rule: A User must be able to submit an Order

  Background:
    Given a user named "Sam"
    And that Sam lives in a state with 10% sales tax
    And a SKU named "Cool Shoes" with a price of $40.00
    And that Cool Shoes is in stock
    And that during checkout, Sam provides his shipping address and selects a shipping
      rate with a price of $5.00
    And that during checkout, Sam provides his payment information
    And that at the moment Sam commits to the sale, Cool Shoes is still in stock

  Example: Sam orders one pair of shoes from an Enterprise configured to include sales tax
    in the list price of SKUs.

    Given a primary Enterprise configured to include sales tax in the list price of SKUs
    And that Sam has an Order containing 1 Cool Shoes
    When Sam submits the Order
    Then Sam is charged $49.00
    And the Enterprise is alerted of the new order

  Example: Sam orders one pair of shoes from an Enterprise configured to NOT include sales
    tax in the list price of SKUs.

    Given a primary Enterprise configured to NOT include sales tax in the list price
      of SKUs
    And that Sam has an Order containing 1 Cool Shoes
    When Sam submits the Order
    Then Sam is charged $45.00
    And the Enterprise is alerted of the new order

Rule: When an Order enters "Cart checkout" status, its SKUs are "reserved" with respect
  to Inventory.

  Example: Sam and Cam each put one pair of shoes in their cart, and Sam begins checkout.

    Given 2 users named Sam and Cam
    And an in-stock SKU named Shoes with 1 left in inventory
    And that Sam and Cam each put Shoes into their cart
    When Sam begins the checkout process
    Then the Order's status changes to "Cart checkout"
    And Cam is no longer able to purchase Shoes
    And the SKU's stock quantity appears to Cam as zero

Rule: If Sam and Cam both submit their orders containing a SKU with only 1 left in
  Inventory, one of their orders is not submitted.
