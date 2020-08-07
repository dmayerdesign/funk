Feature: Sign in

  Rule: The app can remember a device (i.e. can anonymously sign a user in).

    Example: Paul visits the homepage of the website for the second time.
      Given a user named Paul
      And that Paul has visited the site before
      And that Paul has not provided any personal information to the app
      When Paul visits the homepage
      Then Paul's device is recognized by the application

  Rule: A user can sign in with their email and password from anywhere in the UI.

    Example: Paul signs in with his email and password.
      Given a user named Paul
      And that Paul has previously signed up with his email and password
      And that Paul is on the homepage
      And that Paul has opened a modal or dropdown containing the sign in form
      When Paul fills and submits the form
      Then Paul is recognized by the application

  Rule: A user can sign in using an OAuth provider from anywhere in the UI.

    Example: Paul signs in with his Google account.
      Given a user named Paul
      And that Paul is on the homepage
      And that Paul has opened a modal or dropdown containing the "sign in with Google" button
      When Paul clicks the button
      Then Paul is directed through Google's OAuth flow and back to the UI
      And Paul is recognized by the application
