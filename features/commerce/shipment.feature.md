# Feature: Shipment

## Rule: The Enterprise's shipping cost strategy must be persisted (flat rate or by weight).

## Rule: A customer's shipping address must be verified before shipping rates are fetched.

## Rule: A customer must see options for shipping rates before submitting an Order.

### Example: Sam the shopper has a choice of by-weight shipping rates at checkout.

  Given an Enterprise with a "weight" shipping cost strategy
  And a user named Sam with an Order containing 3 Skus
  And that the Skus have a combined weight of 10 lbs
  When Sam tries to submit the Order
  Then Sam sees a list of SimpleRates ordered from least to most expensive
  And the list is based on the Parcel that most closely matches the Skus' combined weight
  And each rate has a delivery date estimate and a delivery date guarantee 
