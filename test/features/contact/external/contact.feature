Feature: Contact form

  Rule: A user must be able to contact the owner.

    Example: Anaya fills and submits a contact form.

      Given a User named Anaya with role ANONYMOUS
      And that Anaya has filled out a contact form with their name and a message
      When Anaya submits the form
      Then every user with role OWNER will receive Anaya's message
      And the message will identify Anaya as the sender

  Rule: Bots should not be allowed to contact the owner

    Example: The turing test blocks a bot from submitting the contact form.

      When a bot attempts to submit the form
      Then the bot does not pass the turing test
      And the form submission fails
      And a message is displayed in case the bot is a real user
