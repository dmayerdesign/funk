Feature: Must create a payment intent when an order is created

  Scenario: A new user is created

    Given an order being created prior to checkout

    When it is created,

    Then the app must persist the user's intent to pay
    And the app must persist an idempotency key to be used throughout the lifespan of this
      order.
