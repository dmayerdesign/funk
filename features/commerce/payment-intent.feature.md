# Feature: Signal intent to pay

## Rule: One order to one payment intent.

### Example: When an Order is created, an intent to pay is created.

  Given a user named Annie
  And a payment service provider named Stripe
  When Annie's order is created
  Then the app must persist Annie's intent to pay with Stripe
  And the app must persist a key allowing it to fetch Annie's intent to pay from Stripe

## Rule: Functions associated with payment must be idempotent.

### Example: When an Order is created, an idempotency key is persisted.

  Given a user named Annie
  And a payment service provider named Stripe
  When Annie's order is created
  Then the app must send an idempotency key to Stripe
  And persist the idempotency key on Annie's order

### Example: Payment is submitted for an Order when its status changes from "Cart" to "Payment Pending"

  Given a user named Annie
  And a payment service provider named Stripe
  And that Annie has an Order with a nonzero price
  When Annie updates the Order's status from "Cart" to "Payment Pending"
  Then the payment is submitted to Stripe
