Feature: Handle a User's intent to pay for an Order

  Rule: Orders and PaymentIntents must have a one-to-one relationship.

    Example: When an Order enters "Cart Checkout" status, a PaymentIntent is created.

      Given a user named Annie
      And a payment service provider named Stripe
      And that Annie has an Order with one or more SKUs
      And that the Order's total after tax exceeds USD 0.50
      When Annie's Order enters "Cart Checkout" status
      Then the app must persist Annie's PaymentIntent with Stripe
      And the app must associate a lookup key for the PaymentIntent with Annie's Order

  Rule: Functions associated with a PaymentIntent must be idempotent.

    Example: When an Order is created, an idempotency key is persisted for convenience.

      Given a user named Annie
      And a payment service provider named Stripe
      When Annie's Order is created
      Then the app must persist the idempotency key on Annie's Order

    Example: Due to a network error, an Order is submitted to Stripe twice.

      Given a user named Annie
      And a payment service provider named Stripe
      And that Annie has an Order with one or more SKUs
      And that the total after tax exceeds USD 0.50
      And that the Order contains an idempotency key
      When Annie updates the Order's status from "Cart Checkout" to "Payment Pending"
      And the payment is submitted to Stripe
      And a network error causes the payment to be submitted to Stripe again
      Then the idempotency key is used to ensure that the payment is not submitted more
  than once
