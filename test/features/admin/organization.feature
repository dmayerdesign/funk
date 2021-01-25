Feature: Organization

  Rule: Information about the Organization or Enterprise administering the app must be persisted.

    Example: A list of shipping carriers defined by the Enterprise are displayed as options in the
      "checkout" flow.

      Given an Enterprise with a list of shipping carriers
      And a Customer named Charles
      When Charles goes through the "checkout" flow
      Then Charles sees the list of shipping carriers

  Rule: There must be one and only one "primary" Organization.
