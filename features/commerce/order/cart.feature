Feature: Shopping Cart

A Cart is an Order with status "Cart" or "Cart Checkout". As soon as a user is created,
an order associated with them is created with status "Cart".

Rule: A User must always have a shopping cart.

  Example: When a User is created, a Cart is created for them.

    Given a first-time visitor named Newt
    When Newt visits the app for the first time
    Then the app creates an Order associated with Newt
    And the Order has a status of "Cart"

  Example: When a User submits an Order, a new Cart is created for them.

    Given a User named Annie
    And that Annie has an Order ready to submit
    When Annie successfully submits their Order
    Then a new Cart is created for Annie

Rule: A User may add in-stock products to their cart.

  Example: Sally adds rollerblades to their cart.

    Given a User named Sally
    And an in-stock SKU named Rollerblades
    When Sally tries to add Rollerblades to their cart
    Then the Rollerblades are successfully added

  Example: Sally cannot add Covfefe to their cart.

    Given a User named Sally
    And an out-of-stock SKU named Covfefe
    When Sally tries to add Covfefe to their cart
    Then Covfefe's out-of-stock status is communicated to Sally
    And Sally is not able to add Covfefe to their cart

Rule: A User must go through a "checkout" flow before submitting an Order.

  Background:

    Given a User named Chuck
    And that Chuck's Cart contains in-stock SKUs

  Example: Chuck begins the "checkout" flow.

    When Chuck begins the "checkout" flow
    Then the status of Chuck's Cart changes to "Cart Checkout"

  Example: Chuck completes the "checkout" flow.

    Given that Chuck has provided their payment information
    And that Chuck has provided their shipping address and chosen a shipping rate
    When Chuck submits their Order
    Then the status of Chuck's Order changes to "Payment Pending"

Rule: When an Order enters "Cart Checkout" status, its SKUs are reserved with respect
  to Inventory.

  Example: Sam and Cam each put one pair of shoes in their cart, and Sam begins checkout.

    Given 2 users named Sam and Cam
    And an in-stock SKU named Cool Shoes with 1 left in inventory
    And that Sam and Cam each put Cool Shoes into their carts
    When Sam begins the "checkout" flow
    Then Cam is no longer able to purchase Cool Shoes
    And the SKU's stock quantity appears to Cam as zero
