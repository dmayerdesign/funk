Feature: Cover images for blog posts

  Rule: An admin can add a cover image to a blog post.

    @wip
    Example: Paul adds a cover image to a blog post.

      Given an admin named Paul
      And that Paul has a blog post
      When Paul intends to add a new cover image
      Then a new cover image is added

  Rule: An admin can change the cover image to a previously-added image.

    @wip
    Example: Paul changes the cover image of a blog post to a previously-added image.

      Given an admin named Paul
      And that Paul has a blog post
      And that the blog post has a cover image
      And that Paul has a new image
      When Paul intends to change the post's cover image to the new image
      Then the post's cover image is changed to the new image
