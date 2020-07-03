Feature: Create/update/delete managed content as an administrator

Rule: An administrator can edit managed content in the production environment.

  Example: An admin User with no previews sees the same content as the public.

    Given an admin named Adam with no previews
    When Adam visits a view with managed contents
    Then Adam sees the published values of each content

  Example: An admin User can edit content in place.

    Given an admin named Adam
    And that Adam has no previews
    When Adam edits a content value and submits it
    Then the content preview replaces the content in the UI
    And Adam enters the "preview" state

Rule: When 2 admin Users simultaneously intend to edit the same managed content, they are both warned.

  Example: 2 admin Users simultaneously enter "preview" mode on the home page.

    Given an admin named Adam
    And an admin named Amy who has entered the "preview" state on the home page
    When Adam enters the "preview" state on the home page
    Then Adam is warned that Amy is also editing content on the home page
