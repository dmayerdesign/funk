# Feature: Add a product
This feature inherits from administration/edit-data.

## Rule: An administrator can create a product.

### Example: Adam, an administrator, creates a product.
  Given an administrator named Adam
  And a product named Sweater
  When Adam visits the "add product" view
  And fills out the "add product" form with the details of Sweater
  And performs the "stage changes" action
  Then the new product is added to the change set
