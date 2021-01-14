Feature: Order

  Rule: A User may submit an Order

    Background:

      Given a user named Sam
      And a primary Enterprise named The Shoe Store
      And a payment service provider named PSP
      And a SKU named Cool Shoes with a price of USD 45.00
      And that Sam lives in a state with 10% sales tax
      And that The Shoe Store is configured to NOT include sales tax in the list price of SKUs
      And that Cool Shoes is in stock
      And that during checkout, Sam provides his shipping address and selects a shipping
      rate with a price of USD 5.00
      And that during checkout, Sam provides his payment information
      And that at the moment Sam commits to the sale, Cool Shoes is still in stock

    Example: Sam orders one pair of shoes.

      Given that Sam has an Order for 1 Cool Shoes
      When Sam completes the "checkout" flow for the Order
      Then a payment of USD 55.00 is charged to Sam using The Shoe Store's PSP account
      And a success message is communicated to Sam
      And The Shoe Store is alerted of the new Order

  Rule: A User may not submit an Order if the final price is less than USD 0.50

    Example: Sam is not allowed to complete the "checkout" flow for an Order totaling less than
      USD 0.50.

      Given that Sam has an Order for one or more SKUs
      And that Sam selects a compoundable Discount for free shipping
      When Sam selects a compoundable Discount for 100% off all SKUs
      Then the Order Price is set to USD 0.50
      And it is communicated to Sam that Orders totaling less than USD 0.50 are not allowed
