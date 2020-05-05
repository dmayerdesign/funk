Feature: Shopping cart

A cart is an order with status "Cart". As soon as a user is created, an order associated
with them is created with status "Cart".

Rule: A User must always have a shopping cart.

  Example: When a user is created, a cart is created for them.

    Given a first-time visitor named Newt
    When Newt visits the app for the first time
    Then the app creates an Order associated with Newt
    And the Order has a status of "Cart"

Rule: A User may add in-stock products to their cart.

  Example: Sally adds rollerblades to their cart.

    Given a User named Sally
    And an in-stock SKU named Rollerblades
    When Sally tries to add Rollerblades to their cart
    Then the Rollerblades are successfully added

  Example: Sally cannot add covfefe to their cart.

    Given a User named Sally
    And an out-of-stock SKU named Covfefe
    When Sally tries to add Covfefe to their cart
    Then Sally is not able to add Covfefe to their cart
    And Covfefe's out-of-stock status is communicated to Sally
