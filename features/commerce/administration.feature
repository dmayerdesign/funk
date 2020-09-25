Feature: Commerce administration

  Rule: An administrator can use a spreadsheet to manage Skus.

    Example: Adam uploads a spreadsheet of new Skus.

      Given an administrator named Adam
      When Adam uploads a spreadsheet of new Skus
      Then the Skus are persisted
      And the Skus are not visible to the public

    Example: Adam uploads a spreadsheet of new Skus before uploading the associated Products.

      Given an administrator named Adam
      And that Adam has not yet added any Products
      When Adam uploads a spreadsheet of new Skus
      Then the Skus are persisted
      And the associated Products are created

    Example: Adam uploads a spreadsheet of existing Skus.

      Given an administrator named Adam
      And that Adam has uploaded a spreadsheet of Skus
      When Adam uploads an updated spreadsheet of Skus
      Then the updates to the Skus are persisted based on the "SKU" column
      And the Skus are not visible to the public

    Example: Adam uploads a list of Images.

      Given an administrator named Adam
      And that Adam has uploaded a spreadsheet of Skus
      When Adam uploads images for the Skus
      Then the images are stored and associated with the Skus
      And corresponding ImageGroups are created

    Example: Adam reviews the Skus before making them visible to the public.

      Given an administrator named Adam
      And that Adam has uploaded a spreadsheet of Skus
      And that Adam has uploaded images for the Skus
      When Adam decides that the Skus are ready to be published
      Then the Skus become visible to the public

    Example: Adam undoes a botched upload.

      Given an administrator named Adam
      And that Adam has uploaded a spreadsheet of Skus
      And that the spreadsheet contains bad data
      When Adam decides to undo the bad upload
      Then the bad data is forgotten

  Rule: An administrator can use a spreadsheet to manage Products.

  Rule: Sku data is not duplicated in the Product spreadsheet.

  Rule: An administrator can export a spreadsheet of Order data for any time interval.
