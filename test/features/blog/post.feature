Feature: Blog posts

  Rule: An admin can add a blog post.

    Scenario: Paul adds a blog post.

      Given an admin named Paul
      When Paul begins to write a blog post
      Then the blog post is saved

  Rule: An admin can publish a blog post.

    Scenario: Paul publishes a blog post.

      Given an admin named Paul
      And that Paul has written a blog post
      When Paul intends to publish the blog post
      Then the general public can see the blog post

  Rule: An admin can remove a blog post.

    Scenario: Paul removes a published blog post.

      Given an admin named Paul
      And Paul has published a blog post named Hello!
      When Paul intends to remove Hello!
      Then Hello! is removed from all users' view
      And Hello! is moved to the Trash

  Rule: Blog posts without a title are not allowed

  Rule: Blog posts without a body are not allowed

  Rule: An anonymous user can view published posts by category.

    Scenario: Amy visits the default category page ("blog").

      Given a user named Amy
      And that there are blog posts under the category "blog"
      When Amy requests all blog posts
      Then Amy gets all blog posts
      And each blog post is represented by its title and its cover image

  Rule: An anonymous user can view the contents of a blog post.

    Scenario: Amy visits a blog post.

      Given a user named Amy
      And a blog post named Hello!
      When Amy visits Hello!
      Then Amy gets the title and subtitle
      And Amy gets the entire HTML contents of Hello!
