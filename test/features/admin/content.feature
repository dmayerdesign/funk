Feature: Create/update/delete managed content as an administrator

  Rule: An administrator can edit managed content in the production environment.

    Example: An administrator with no previews sees the same content as the public.

      Given an admin named Adam
      And that Adam is not in the "preview" state
      When Adam visits a view with managed contents
      Then Adam sees the published values of each content

    Example: An administrator can edit content in place.

      Given an admin named Adam
      And that Adam is not in the "preview" state
      When Adam edits a content value and submits it
      Then the content preview replaces the content in the UI
      And Adam enters the "preview" state

    Example: An administrator publishes their previewed changes.

      Given an admin named Adam
      And that Adam has edited content and is in the "preview" state
      And that no other admins have edited the same content
      When Adam hits the "publish" button
      And confirms that he intends to publish
      Then the corresponding production data is replaced with the preview values
      And Adam exits the "preview" state

  Rule: An administrator can easily roll back a change.

  Rule: An administrator can easily undo a rollback.

  Rule: When 2 administrators simultaneously intend to edit the same managed content, they are both warned.

    Example: 2 administrators simultaneously enter "preview" mode on the home page.

      Given an admin named Adam
      And an admin named Amy who has entered the "preview" state on the home page
      When Adam enters the "preview" state on the home page
      Then Adam is warned that Amy is also editing content on the home page
