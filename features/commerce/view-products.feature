Feature: View a list of products

Rule: Any user can view a list of all products.

  Example: Anaya, a new user, visits an "all products" view.

    Given a first-time user named Anaya
    When Anaya visits an "all products" view
    Then Anaya sees a list of products
    And the list is laid out as a grid

Rule: A list of all products should be from most sales to least sales (unless the administrator has set a different policy).

  Example: Anaya visits an "all products" view and sees best-sellers first.

    Given a first-time user named Anaya
    And that the site administrator has not set a policy for how products should be
      ordered
    When Anaya visits an "all products" view
    Then Anaya sees products ordered from most sales to least sales

  Example: Anaya visits an "all products" view and sees new arrivals first.

    Given a first-time user named Anaya
    And that the site administrator has set a policy that products added to inventory
      within the last month should always be at the top of the list
    When Anaya visits an "all products" view
    Then Anaya sees products added to inventory within the last month first, followed
      by products ordered from most sales to least sales
