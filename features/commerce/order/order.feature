Feature: Order

Rule: A User may submit an Order

  Background:

    Given a user named Sam
    And that Sam lives in a state with 10% sales tax
    And a SKU named Cool Shoes with a price of $40.00
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

Rule: Payment is submitted for an Order when the User completes the "checkout" flow.

  Example: Annie successfully submits an Order.

    Given a user named Annie
    And a payment service provider named Stripe
    And that Annie has an Order with one or more SKUs
    And that the total after tax exceeds USD 0.50
    When Annie completes the "checkout" flow
    Then the payment is submitted to Stripe
    And a success message is communicated to Annie
