# Funk

Funk aims to be a well-organized, well-optimized starting point for writing web-based
software. With just a bit of configuration, you get a
[serverless](https://en.wikipedia.org/wiki/Serverless_computing)
[progressive web app](https://en.wikipedia.org/wiki/Progressive_web_applications)
written with [Angular](https://angular.io) to run on
[Firebase](https://firebase.google.com).

## What's "serverless"?

Managing a server and database—even if that means combining managed solutions for
each—gives me, a front end developer, far more control (and opportunity to mess up) than
I want. A fully-managed back end, like Firebase, takes care of all your infrastructure, so
you can focus on writing code.

## Design goals

- **Zero to app in 10 minutes:** Funk aims to lower the barrier of entry for full-stack
  development, allowing you to deploy a production-ready app in almost no time.
- **Cost-effectiveness:** Costly behaviors like reads and writes from Firestore should
  perform as efficiently as possible out of the box.
- **Performance:** Offline support and pre-rendering make sure users get a fast, modern
  experience.
- **Developer experience:** Using Funk should be dead simple and super fun. Funk strives
  for convention over configuration

## Design features

- **TypeScript:** Native support by both Google Cloud Functions and Angular is a plus, but
  it's TypeScript's amazing feature set that make it a winner for enterprise-level full-
  stack development.
- **Serverless:** By integrating with Google Cloud Firestore and Cloud Functions, Funk
  lets you build and deploy an app with minimal configuration and minimal cost.
