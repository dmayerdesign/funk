Feature: Shopping Cart API

  A cart is an order with status "Cart" or "Cart Checkout". As soon as a user is created,
  an order associated with them is created with status "Cart".

  Rule: A user must always have a shopping cart.

    Example: When Newt is created, a cart is created for Newt.

      Given a customer named Newt
      When Newt visits the app for the first time
      Then the app creates an order associated with Newt
      And the order has a status of "Cart"

    Example: When Annie submits an order, a new cart is created for Annie.

      Given a customer named Annie
      And that Annie's cart contains in-stock SKUs
      When Annie successfully submits their order
      Then a new cart is created for Annie

  Rule: A user must have quick access to their cart anywhere in the Commerce app.

    Background:

      Given a customer named Newt
      And that Newt has added a SKU to their cart

    @ignore
    Example: Basic details of Newt's cart are visible while they browse the Commerce app.

      When Newt visits any page in the Commerce app
      Then Newt can see an indication that there is 1 SKU in their cart
      And Newt should have the option of easily viewing the cart

    @ignore
    Example: Newt checks on their cart while browsing the Commerce app.

      When Newt visits any page in the Commerce app
      And Newt attempts to view the cart
      Then details of the cart should be communicated to Newt

  Rule: A user may only add in-stock products to their cart.

    Example: Sally can add the in-stock SKU Rollerblades to their cart.

      Given a customer named Sally
      And an in-stock SKU named Rollerblades
      When Sally tries to add Rollerblades to their cart
      Then the Rollerblades are successfully added

    @ignore
    Example: Sally cannot add the out-of-stock SKU Covfefe to their cart.

      Given a customer named Sally
      And an out-of-stock SKU named Covfefe
      When Sally tries to add Covfefe to their cart
      Then Sally is not able to add Covfefe to their cart
      And Covfefe's out-of-stock status is communicated to Sally

  Rule: A user must go through a "checkout" flow before submitting an order.

    Background:

      Given a customer named Chuck
      And that Chuck's cart contains in-stock SKUs

    Example: Chuck begins the "checkout" flow.

      When Chuck begins the "checkout" flow
      Then the status of Chuck's cart changes to "Cart Checkout"

    Example: Chuck completes the "checkout" flow with errors.

      Given that Chuck has provided their payment information
      And that Chuck has provided their shipping address and chosen a shipping rate
      When Chuck submits their order
      Then the status of Chuck's order changes to "Payment Pending"

  Rule: When an order enters "Cart Checkout" status, its SKUs are reserved with respect
    to Inventory.

    Example: Sam and Cam each put one pair of shoes in their cart, and Sam begins checkout.

      Given 2 customers named Sam and Cam
      And an in-stock SKU named Cool Shoes with 1 left in inventory
      And that Sam and Cam each put Cool Shoes into their carts
      When Sam begins the "checkout" flow
      Then Cam is no longer able to purchase Cool Shoes
      And the SKU's stock quantity appears to Cam as zero
