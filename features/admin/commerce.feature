Feature: Add a product

Rule: An administrator can use a spreadsheet to manage products.

  Example: Adam, an administrator, updates his spreadsheet of Products.
    Given an administrator named Adam
    When Adam visits the "add product" view
    And fills out the "add product" form with the details of a Product
    And performs the "save" action
    Then the new product is added to Adam's content previews
