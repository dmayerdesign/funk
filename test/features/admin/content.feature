Feature: Create/update/delete content as an administrator

  Rule: An administrator can edit content in the production environment.

    Example: An administrator with no previews is shown the same contents as the public.

      Given an admin named Adam
      And that Adam is not in the "preview" state
      When Adam visits a view with contents
      Then Adam is shown the published values of each content

    Example: An administrator can edit contents in place.

      Given an admin named Adam
      And that Adam has not edited content
      When Adam edits a content value and submits it
      Then the UI is updated to match the content preview
      And Adam enters the "preview" state

    Example: An administrator publishes their previewed changes.

      Given an admin named Adam
      And that Adam has edited content
      And that no other admins have edited the same content
      When Adam intends to publish
      And confirms that he intends to publish
      Then the corresponding production data is updated to match the preview
      And Adam exits the "preview" state

  Rule: An administrator can easily roll back a change to a single content.

      Given an admin named Adam


  Rule: An administrator can easily undo a rollback.

  Rule: When 2 administrators simultaneously intend to edit the same content, they are both warned.

    Example: 2 administrators simultaneously enter "preview" mode on the home page.

      Given an admin named Adam
      And that Adam has not edited content
      And an admin named Amy who has edited content
      When Adam edits the same content
      Then Adam is warned that Amy is also editing content
