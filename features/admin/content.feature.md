# Feature: Create/update/delete managed content as an administrator

## Rule: An administrator can edit managed content in the production environment.

## Rule: When 2 administrators simultaneously intend to edit the same managed content, they are both warned.

Given an admin named Adam with no previews
When Adam visits a view with managed contents
Then Adam sees the published values of each content

Given an admin named Adam with no previews
When Adam edits a content value and submits it
Then Adam enters a "preview" state
And Adam sees the new value of the content

