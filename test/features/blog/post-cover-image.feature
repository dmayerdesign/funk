Feature: Cover images for blog posts

  Rule: An admin can add a cover image to a blog post.

    Scenario: Paul adds a cover image to a blog post.

      Given an admin named Paul
      And that Paul has a blog post
      When Paul intends to add a new cover image
      Then a new cover image is added

  Rule: An admin can change the cover image to a previously-added image.

    Scenario: Paul changes the cover image of a blog post to a previously-added image.

      Given an admin named Paul
      And that Paul has a blog post
      And that the blog post has a cover image named Roses
      And that Paul has an image named Tulips
      When Paul intends to change the cover image to Tulips
      Then the cover image is changed to Tulips
