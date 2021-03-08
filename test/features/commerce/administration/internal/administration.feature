Feature: Commerce administration

  Rule: An administrator can use a spreadsheet to manage SKUs.

    Example: Adam uploads a spreadsheet of new SKUs.

      Given an administrator named Adam
      When Adam uploads a spreadsheet of new SKUs
      Then the SKUs are saved
      And the SKUs are not visible to the public

    Example: Adam uploads a spreadsheet of new SKUs before uploading the associated Products.

      Given an administrator named Adam
      And that Adam has not yet added any Products
      When Adam uploads a spreadsheet of new SKUs
      Then the SKUs are saved
      And the associated Products are created

    Example: Adam uploads a spreadsheet of existing SKUs.

      Given an administrator named Adam
      And that Adam has uploaded a spreadsheet of SKUs
      When Adam uploads an updated spreadsheet of SKUs
      Then the updates to the SKUs are saved based on the "SKU" column
      And the SKUs are not visible to the public

    Example: Adam uploads a list of Images.

      Given an administrator named Adam
      And that Adam has uploaded a spreadsheet of SKUs
      When Adam uploads images for the SKUs
      Then the images are stored and associated with the SKUs
      And corresponding ImageGroups are created

    Example: Adam reviews the SKUs before making them visible to the public.

      Given an administrator named Adam
      And that Adam has uploaded a spreadsheet of SKUs
      And that Adam has uploaded images for the SKUs
      When Adam decides that the SKUs are ready to be published
      Then the SKUs become visible to the public

    Example: Adam undoes a botched upload.

      Given an administrator named Adam
      And that Adam has uploaded a spreadsheet of SKUs
      And that the spreadsheet contains bad data
      When Adam decides to undo the bad upload
      Then the bad data is forgotten

  Rule: An administrator can use a spreadsheet to manage Products.

  Rule: SKU data is not duplicated in the Product spreadsheet.

  Rule: An administrator can export a spreadsheet of Order data for any time interval.

  Rule: An administrator may not upload a SKU whose price after tax could be less than the minimum order price.

  Rule: A SKU must not have more than 1 attribute value per attribute.
