Feature: Blog posts

  Rule: An admin can add a post category.

    @future
    Example: Paul adds a post category.

      Given an admin named Paul
      When Paul visits any page
      Then Paul is able to add a post category

  Rule: An admin can write a blog post.

    Example: Paul intends to add a blog post.

      Given an admin named Paul
      When Paul visits the post category page "blog-posts"
      Then Paul is able to add a post

    Example: Paul starts writing a blog post.

      Given an admin named Paul
      And Paul visits the post category page "blog-posts"
      When Paul begins to write a blog post
      Then the blog post is saved
      And the blog post has the taxonomy term "blog-posts"

  Rule: An admin can publish a blog post.

    Example: Paul publishes a blog post.

      Given an admin named Paul
      And that Paul has written a blog post
      When Paul intends to publish the blog post
      Then the general public can see the blog post

  Rule: Blog posts without a title are not allowed.

  Rule: Blog posts without a body are not allowed.

  Rule: An admin can remove a blog post.

    Example: Paul removes a published blog post.

      Given an admin named Paul
      And Paul has published a blog post named Hello!
      When Paul intends to remove Hello!
      Then Hello! is removed from all users' view
      And Hello! is moved to the trash

  Rule: An anonymous user can view published posts by category.

    Example: Amy visits the default category page ("blog-posts").

      Given a user named Amy
      And that there are blog posts in the category "blog-posts"
      And there are blog posts in the category "blog-posts" in the trash
      When Amy requests all blog posts in the category "blog-posts"
      Then Amy gets all blog posts in the category "blog-posts"
      And none of the blog posts are in the trash
      And each blog post is represented by its title and its cover image

  Rule: An anonymous user can view the contents of a blog post.

    Example: Amy visits a blog post.

      Given a user named Amy
      And a blog post named Hello!
      When Amy visits Hello!
      Then Amy gets the title and subtitle
      And Amy gets the entire HTML contents of Hello!

  Rule: One draft is always saved until publish.

  Rule: When editing, a user can easily navigate to view the draft.
