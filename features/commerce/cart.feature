Feature: Shopping cart

A cart is an order with status "Cart". As soon as a user is created, an order associated
with them is created with status "Cart".

Rule: A User must always have a shopping cart.

  Example: When a user is created, a cart is created for them.

    Given a first-time visitor named Newt
    When Newt visits the app for the first time
    Then the app creates an Order associated with Newt
    And the Order has a status of "Cart"

  Example: An order is submitted.

    Given a user named Retta who has placed Orders in the past
    When Retta places an Order
    Then a new Order associated with Retta is created
    And the new Order has a status of "Cart"
    