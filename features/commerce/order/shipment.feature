Feature: Shipment

Rule: The Enterprise's shipping cost strategy must be persisted (flat rate or by weight).

Rule: A customer's shipping address must be verified before shipping rates are fetched.

  Example: Sam the shopper provides a VALID shipping address during checkout.

    Given a user named Sam with a valid Order
    And that Sam is going through the checkout flow
    When Sam provides a valid shipping address
    Then he is ABLE to continue to the "shipping options" step

  Example: Sam the shopper provides an INVALID shipping address during checkout.

    Given a user named Sam with a valid Order
    And that Sam is going through the checkout flow
    When Sam provides an invalid shipping address
    Then he is UNABLE to continue to the "shipping options" step

Rule: A customer must see options for shipping rates before submitting an Order.

  Example: Sam the shopper has a choice of by-weight shipping rates during checkout.

    Given an Enterprise with a "by weight" shipping cost strategy
    And a user named Sam with an Order containing 3 Skus
    And that the Skus have a combined weight of 10 lbs
    And that Sam's shipping address has been persisted
    When Sam reaches the "shipping options" step of the checkout flow
    Then Sam sees a list of SimpleRates ordered from least to most expensive
    And the list is based on the Parcel that most closely matches the Skus' combined weight
    And each rate has a delivery date estimate and a delivery date guarantee

  Example: Sam the shopper sees a flat shipping rate during checkout.

    Given an Enterprise with a "flat rate" shipping cost strategy
    And a user named Sam with an Order containing 3 Skus
    And that the Skus have a combined weight of 10 lbs
    And that Sam's shipping address has been persisted
    When Sam reaches the "shipping options" step of the checkout flow
    Then Sam sees a single option for shipping called Flat Rate Shipping
    And Sam sees a delivery date estimate and a delivery date guarantee based on the Parcel
      that most closely matches the Skus' combined weight
