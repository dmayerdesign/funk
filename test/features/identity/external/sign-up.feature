Feature: Sign up

  Rule: The app can remember a device (i.e. can anonymously sign a user up).

    Example: Paula visits the homepage of the website.

      Given a user named Paula
      And that Paula has never visited the site before
      When Paula visits the homepage
      Then Paula's device's identity is saved by the application

  Rule: A user can sign up with their email and password.

    Example: Paula signs up with their email and password.

      Given a user named Paula
      And that Paula is viewing a "create an account" form
      When Paula fills and submits the form
      Then Paula's identity is saved by the application

  Rule: A user can sign up using an OAuth provider.

    Example: Paula signs up with their Google account.

      Given a user named Paula
      And that there is a way for Paula to sign up with Google
      When Paula intends to sign up with her Google account
      Then Paula is directed through Google's OAuth flow and back to the UI
      And Paula's identity is saved by the application
