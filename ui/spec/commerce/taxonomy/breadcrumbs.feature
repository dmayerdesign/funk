Feature: Breadcrumbs

  Rule: When a user navigates to a product, the app must allow them to understand how they got there.

    Example: Noel visits the "Swimwear" category, clicks on a product, and .

      Given a user named Noel
      And that they are browsing the "Swimwear" category
      When they click on a product
      Then a breadcrumb is visible which includes the "Swimwear" category
