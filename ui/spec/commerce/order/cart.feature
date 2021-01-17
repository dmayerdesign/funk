Feature: Shopping Cart UI

  Rule: A user must have quick access to their cart anywhere in the Commerce app.

    Background:

      Given a customer named Newt
      And that Newt has added a SKU to their cart

    Example: Basic details of Newt's cart are visible while they browse the Commerce app.

      When Newt visits any page in the Commerce app
      Then Newt can see an indication that there is 1 SKU in their cart
      And Newt should have the option of easily viewing the cart

    Example: Newt checks on their cart while browsing the Commerce app.

      When Newt visits any page in the Commerce app
      And Newt attempts to view the cart
      Then details of the cart should be communicated to Newt

  Rule: A user must go through a "checkout" flow before submitting an order.

    Background:

      Given a customer named Chuck
      And that Chuck's cart contains in-stock SKUs

    Example: Chuck completes the "checkout" flow.

      Given that Chuck has provided their payment information
      And that Chuck has provided their shipping address and chosen a shipping rate
      When Chuck submits their order
      Then a success message is communicated to Chuck

  Rule: A customer must be prevented from checking out with an out-of-stock SKU.

    Example: Sam and Cam both try to check out with Cool Shows, which has 1 in inventory.

      Given a customer named Cam
      And an in-stock SKU named Cool Shoes with 1 left in inventory
      And that Cam has 1 Cool Shoes in his cart
      And that another customer checks out with Cool Shoes
      When Cam tries to begin the checkout flow
      Then Cool Shoes's stock quantity appears to Cam as zero
      And a message is communicated to Cam explaining what happened
