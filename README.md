# Funk

Serverless progressive web app written with Angular to run on Google's Cloud Firestore and
Cloud Functions.

## Design goals

- **Cost-effectiveness:** Funk aims to read and write data from Cloud Firestore as
  efficiently as possible.
- **Performance:** Offline support and pre-rendering make sure users get a fast, modern
  experience.
- **Developer experience:** Using Funk should be dead simple and super fun.

## Features
- **TypeScript:** Native support by both Google Cloud Functions and Angular is a plus, but
  it's TypeScript's amazing feature set, including
  [strict null checking](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
  and [structural subtyping](https://www.typescriptlang.org/docs/handbook/type-compatibility.html),
  that make it a winner for enterprise-level full-stack development.
- **Serverless:** By integrating with Google Cloud Firestore and Cloud Functions, Funk
  lets you build and deploy an app with minimal configuration and minimal cost.
